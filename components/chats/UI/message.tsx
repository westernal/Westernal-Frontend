import Link from "next/link";
import { Message } from "../../../interfaces/interface";
import Image from "next/image";
import { HOST } from "../../../data/data";
import formatDate from "../../../functions/formatDate";
import { getCookie } from "cookies-next";
import decodeJWT from "../../../functions/decodeJWT";

const Message = ({ message }: { message: Message }) => {
  return (
    <div
      className="comment flex"
      style={
        message.sender.username ==
        decodeJWT(getCookie("cookieToken").toString()).username
          ? null
          : { backgroundColor: "#5f5d5d" }
      }
    >
      <div className="flex comment-main ">
        <Link href={`/${message.sender.username}`} className="flex">
          <span>
            <Image
              src={HOST + message.sender.avatar}
              alt="user avatar"
              id="avatar"
              width={40}
              height={40}
            />
          </span>
          <div id="cm-user" className="flex">
            {message.sender.username}
            {message.sender.verified ? (
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
        <span className="comment-message">{message.text}</span>
      </div>

      <div className="cm-info">
        <p id="date">{formatDate(message.createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
