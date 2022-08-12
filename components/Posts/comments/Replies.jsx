import { useState } from "react";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import dateFormat from "dateformat";
import DeleteComment from "./DeleteComment";

const Replies = ({ replies, onDelete }) => {
  const [deletable, SetDeletable] = useState(false);

  return (
    <>
      {replies.map((reply) => {
        const userId = jwtDecode(localStorage.getItem("token")).userId;

        if (userId === reply.writer.id) {
          if (!deletable) {
            SetDeletable(true);
          }
        } else {
          if (deletable) {
            SetDeletable(false);
          }
        }

        return (
          <div className="comment reply flex" key={reply._id}>
            <div className="cm-main flex">
              <Link
                href={`/profile/${reply.writer.username}/${reply.writer.id}`}
              >
                <a className="flex">
                  <p id="cm-user">{reply.writer.username}:</p>
                </a>
              </Link>
              <p dir="auto" className="cm-text">
                {reply.message}
              </p>
            </div>
            <div className="cm-info">
              <div className="flex">
                <p id="date">{dateFormat(reply.date, "mmm d, yyyy")}</p>
              </div>
              {deletable && (
                <DeleteComment onDelete={onDelete} id={reply._id} />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Replies;
