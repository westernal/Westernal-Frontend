import Link from "next/link";
import { Chat, ChatMember } from "../../interfaces/interface";
import Image from "next/image";
import { HOST } from "../../data/data";
import { useEffect, useState } from "react";
import decodeJWT from "../../functions/decodeJWT";
import { getCookie } from "cookies-next";

const Conversation = ({ chat }: { chat: Chat }) => {
  const [member, SetMember] = useState<ChatMember>();

  useEffect(() => {
    const getReceiver = () => {
      const username = decodeJWT(getCookie("cookieToken").toString()).username;
      SetMember(
        chat.members.filter((member) => member.username !== username)[0]
      );
    };

    getReceiver();
  }, []);
  return (
    <Link href={`/${chat._id}`} className="user flex profile-notif">
      <div className="flex user-info">
        <Image
          src={HOST + member.image}
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
          alt="user avatar"
        />

        <strong id="userId">{member.username} </strong>
        {member.verified ? (
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
  );
};

export default Conversation;
