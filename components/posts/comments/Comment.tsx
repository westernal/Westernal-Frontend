import Link from "next/link";
import { useState, useEffect } from "react";
import DeleteComment from "./DeleteComment";
import ReplyComment from "./replies/ReplyComment";
import Replies from "./replies/Replies";
import formatDate from "../../../functions/formatDate";
import Image from "next/image";
import getRequest from "../../../functions/requests/getRequest";
import { getCookie } from "cookies-next";
import decodeJWT from "../../../functions/decodeJWT";
import { Comment } from "../../../interfaces/interface";

const Comment = ({
  comment,
  onDelete,
  onReply,
}: {
  comment: Comment;
  onDelete: any;
  onReply: any;
}) => {
  const [deletable, SetDeletable] = useState<boolean>(false);
  const [replies, SetReplies] = useState([]);
  const host = "https://alinavidi.ir/";

  useEffect(() => {
    const getReplies = async () => {
      const result = await getRequest(
        `api/comments/replies/${comment._id}`,
        true
      );

      if (result?.status == 200) {
        SetReplies(result.data.replies);
      }
    };

    const userId = decodeJWT(getCookie("cookieToken").toString()).userId;

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
                src={host + comment.writer.avatar}
                alt="user avatar"
                id="avatar"
                width={40}
                height={40}
              />
            </span>
            <div id="cm-user" className="flex">
              {comment.writer.username}
              {comment.writer.verified ? (
                <div className="verify">
                  <Image
                    src="/Images/verified (2).png"
                    alt="verify"
                    width={20}
                    height={20}
                  />
                </div>
              ) : null}
            </div>
          </Link>
          <span className="comment-message">{comment.message}</span>
        </div>

        <div className="cm-info">
          <div className="flex">
            <p id="date">{formatDate(comment.date)}</p>
            <ReplyComment onReply={onReply} id={comment._id} />
          </div>
          {deletable ? (
            <DeleteComment onDelete={onDelete} id={comment._id} />
          ) : null}
        </div>
      </div>
      <Replies replies={replies} onDelete={onDelete} />
    </>
  );
};

export default Comment;
