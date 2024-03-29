import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteComment from "../DeleteComment";
import formatDate from "../../../../functions/formatDate";
import Image from "next/image";
import decodeJWT from "../../../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import { Comment } from "../../../../interfaces/interface";
import { HOST } from "../../../../data/data";

const Reply = ({ reply, onDelete }: { reply: Comment; onDelete: any }) => {
  const [deletable, SetDeletable] = useState(false);

  useEffect(() => {
    const userId = decodeJWT(getCookie("cookieToken").toString()).userId;

    if (userId === reply.writer.id) {
      SetDeletable(true);
    }
  }, [reply]);

  return (
    <div className="comment reply flex" key={reply._id}>
      <div className="flex comment-main">
        <Link href={`/${reply.writer.username}`} className="flex">
          <span>
            <Image
              src={HOST + reply.writer.avatar}
              alt="user avatar"
              id="avatar"
              width={40}
              height={40}
            />
          </span>
          <div id="cm-user" className="flex">
            {reply.writer.username}
            {reply.writer.verified ? (
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
        <span className="comment-message">{reply.message}</span>
      </div>

      <div className="cm-info">
        <div className="flex">
          <p id="date">{formatDate(reply.date)}</p>
        </div>
        {deletable ? (
          <DeleteComment onDelete={onDelete} id={reply._id} />
        ) : null}
      </div>
    </div>
  );
};

export default Reply;
