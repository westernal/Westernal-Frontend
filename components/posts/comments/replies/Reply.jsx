import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import dateFormat from "dateformat";
import DeleteComment from "../DeleteComment";

const Reply = ({ reply, onDelete }) => {
  const [deletable, SetDeletable] = useState(false);

  useEffect(() => {
    const userId = jwtDecode(localStorage.getItem("token")).userId;

    if (userId === reply.writer.id) {
      SetDeletable(true);
    }
  }, [reply]);

  return (
    <div className="comment reply flex" key={reply._id}>
      <p>
        <Link href={`/${reply.writer.username}`}>
          <span id="cm-user">{reply.writer.username}: </span>
        </Link>
        <span>{reply.message}</span>
      </p>

      <div className="cm-info">
        <div className="flex">
          <p id="date">{dateFormat(reply.date, "mmm d, yyyy")}</p>
        </div>
        {deletable && <DeleteComment onDelete={onDelete} id={reply._id} />}
      </div>
    </div>
  );
};

export default Reply;
