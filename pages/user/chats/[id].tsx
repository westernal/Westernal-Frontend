import { mutate } from "swr";
import ChatInput from "../../../components/chats/UI/chatInput";
import Messages from "../../../components/chats/UI/messages";
import BackHeader from "../../../components/layout/header/BackHeader";
import { useEffect, useState } from "react";
import decodeJWT from "../../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import postRequest from "../../../functions/requests/postRequest";
import getRequest from "../../../functions/requests/getRequest";
import useSocket from "../../../hooks/useSocket";

const Chat = () => {
  const router = useRouter();
  const [messages, SetMessages] = useState<any>([]);
  const [senderId, SetSenderId] = useState<string>();
  const { arrivalMessage } = useSocket(senderId);

  useEffect(() => {
    const id = decodeJWT(getCookie("cookieToken").toString()).userId;
    SetSenderId(id);
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      SetMessages(messages.push(arrivalMessage));
    }
  }, [arrivalMessage]);

  const getMessages = async (chatId: any) => {
    const result = await getRequest(`api/chats/chat/messages/${chatId}`, true);

    if (result?.status === 200) {
      SetMessages(result.data.messages);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getMessages(router.query.id);
    }
  }, [router.query]);

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

  useEffect(() => {
    if (router.query.id) resetMessageCount();
  }, [router.query]);
  return (
    <>
      <BackHeader title="Chat" />
      <main className="chats">
        <Messages messages={messages} />
        <ChatInput onMessageSent={getMessages} />
      </main>
    </>
  );
};

export default Chat;
