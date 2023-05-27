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

const Chat = ({ userId }) => {
  const router = useRouter();
  const [messages, SetMessages] = useState<any>([]);
  const { arrivalMessage, returnedSocket } = useSocket(userId);

  useEffect(() => {
    if (arrivalMessage) {
      SetMessages((prev: any) => {
        let newState = prev.slice();
        newState.unshift(arrivalMessage);
        return newState;
      });
    }
  }, [arrivalMessage]);

  const getMessages = async (chatId: any, isMounted: boolean) => {
    const result = await getRequest(`api/chats/chat/messages/${chatId}`, true);

    if (result?.status === 200) {
      if (isMounted) SetMessages(result.data.messages);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (router.query.id) {
      getMessages(router.query.id, isMounted);
    }
    return () => {
      isMounted = false;
    };
  }, [router.query]);

  const resetMessageCount = async () => {
    const result = await postRequest(
      {
        chatId: router.query.id,
      },
      `api/users/messages/reset/${userId}`,
      true
    );
  };

  useEffect(() => {
    if (router.query.id) resetMessageCount();
  }, [router.query, messages]);
  return (
    <>
      <BackHeader title="Chat" />
      <main className="chats">
        <Messages messages={messages} />
        <ChatInput onMessageSent={getMessages} socket={returnedSocket} />
      </main>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const userId: string = decodeJWT(
    getCookie("cookieToken", { req, res }).toString()
  ).userId;

  return {
    props: { userId: userId },
  };
};

export default Chat;
