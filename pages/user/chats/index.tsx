import { getCookie } from "cookies-next";
import getRequest from "../../../functions/requests/getRequest";
import { Chat } from "../../../interfaces/interface";
import BackHeader from "../../../components/layout/header/BackHeader";
import Conversation from "../../../components/chats/conversation";
import { useEffect, useState } from "react";
import decodeJWT from "../../../functions/decodeJWT";
import NewChat from "../../../components/chats/conversation/new";

const Chats = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      const userId = decodeJWT(getCookie("cookieToken").toString()).userId;
      const result = await getRequest(`api/chats/chat/${userId}`, true);

      if (result?.status === 200) {
        setChats(result.data.chats);
      }
    };

    getConversations();
  }, []);
  return (
    <>
      <BackHeader title={"Chats"} />
      <main className="chats">
        Soon will be chats...
        {chats.map((chat) => {
          return <Conversation chat={chat} key={chat._id} />;
        })}
        <NewChat />
      </main>
    </>
  );
};

export default Chats;
