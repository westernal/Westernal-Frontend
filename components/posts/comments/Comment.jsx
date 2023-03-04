import Link from "next/link";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import DeleteComment from "./DeleteComment";
import ReplyComment from "./replies/ReplyComment";
import API from "../../../requests/API";
import Replies from "./replies/Replies";
import formatDate from "../../../functions/formatDate";
import Image from "next/image";

const Comment = ({ comment, onDelete, onReply }) => {
  const [deletable, SetDeletable] = useState(false);
  const [replies, SetReplies] = useState([]);
  const host = "https://alinavidi.ir/";

  useEffect(() => {
    const getReplies = async () => {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        mode: "cors",
        credentials: "include",
      };

      var result = await API(option, `api/comments/replies/${comment._id}`);

      if (result.status == 200) {
        SetReplies(result.data.replies);
      }
    };

    const userId = jwtDecode(localStorage.getItem("token")).userId;

    if (userId === comment.writer.id) {
      SetDeletable(true);
    }

    getReplies();
  }, [comment]);

  return (
    <>
      <div className="comment flex" key={comment._id}>
        <div className="flex comment-main ">
          <Link href={`/${comment.writer.username}`} className=" flex">
            <span>
              <Image
                src={
                  !comment.writer.avatar.includes("userIcon")
                    ? host + comment.writer.avatar
                    : "/Images/user.svg"
                }
                alt="user avatar"
                id="avatar"
                width={40}
                height={40}
              />
            </span>
            <div id="cm-user" className="flex">
              {comment.writer.username}
              {comment.writer.verified && (
                <div className="verify">
                  <Image
                    src="/Images/verified (2).png"
                    alt="verify"
                    width={20}
                    height={20}
                  />
                </div>
              )}
            </div>
          </Link>
          <span className="comment-message">{comment.message}</span>
        </div>

        <div className="cm-info">
          <div className="flex">
            <p id="date">{formatDate(comment.date)}</p>
            <ReplyComment onReply={onReply} id={comment._id} />
          </div>
          {deletable && <DeleteComment onDelete={onDelete} id={comment._id} />}
        </div>
      </div>
      <Replies replies={replies} onDelete={onDelete} />
    </>
  );
};

export default Comment;
