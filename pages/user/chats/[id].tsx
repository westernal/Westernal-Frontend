import { mutate } from "swr";
import ChatInput from "../../../components/chats/UI/chatInput";
import Messages from "../../../components/chats/UI/messages";
import BackHeader from "../../../components/layout/header/BackHeader";
import { useEffect } from "react";
import decodeJWT from "../../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import postRequest from "../../../functions/requests/postRequest";

const Chat = () => {
  const router = useRouter();

  const onMessageSent = (id: string) => {
    mutate(`api/chats/chat/messages/${id}`);
  };

  useEffect(() => {
    const resetMessageCount = async () => {
      const senderId = decodeJWT(getCookie("cookieToken").toString()).userId;
      const result = await postRequest(
        {
          chatId: router.query.id,
        },
        `api/users/messages/reset/${senderId}`,
        true
      );
    };

    if (router.query.id) resetMessageCount();
  }, [router.query]);
  return (
    <>
      <BackHeader title="Chat" />
      <main className="chats">
        <Messages />
        <ChatInput onMessageSent={onMessageSent} />
      </main>
    </>
  );
};

export default Chat;
