import Link from "next/link";
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import DeleteComment from "./DeleteComment";
import ReplyComment from "./replies/ReplyComment";
import API from "../../../requests/API";
import Replies from "./replies/Replies";

const Comment = ({ comment, onDelete, onReply }) => {
  const [deletable, SetDeletable] = useState(false);
  const [replies, SetReplies] = useState([]);

  useEffect(() => {
    const getReplies = async () => {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
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
        <p>
          <Link href={`/${comment.writer.username}`}>
            <a>
              <span id="cm-user">{comment.writer.username}: </span>
            </a>
          </Link>
          <span>{comment.message}</span>
        </p>
        <div className="cm-info">
          <div className="flex">
            <p id="date">{dateFormat(comment.date, "mmm d yyyy, HH:MM")}</p>
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
