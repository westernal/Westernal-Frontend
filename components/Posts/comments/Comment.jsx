import Image from "next/image";
import Link from "next/link";
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import API from "../../../requests/API";
import DeleteComment from "./DeleteComment";

const Comment = ({ comment, onDelete }) => {
  const [deletable, SetDeletable] = useState(false);

  useEffect(() => {
    const userId = jwtDecode(localStorage.getItem("token")).userId;

    if (userId === comment.writer.id) {
      SetDeletable(true);
    }
  }, [comment]);

  return (
    <div className="comment flex" key={comment._id}>
      <div className="cm-main flex">
        <Link href={`/profile/${comment.writer.username}/${comment.writer.id}`}>
          <a className="flex">
            <p id="cm-user">{comment.writer.username}:</p>
          </a>
        </Link>
        <p>{comment.message}</p>
      </div>
      <div className="flex">
        <p id="date">{dateFormat(comment.date, "mmm d, yyyy")}</p>
        {deletable && <DeleteComment onDelete={onDelete} id={comment._id} />}
      </div>
    </div>
  );
};

export default Comment;
