import { mutate } from "swr";
import ChatInput from "../../../components/chats/UI/chatInput";
import Messages from "../../../components/chats/UI/messages";
import BackHeader from "../../../components/layout/header/BackHeader";

const Chat = () => {
  const onMessageSent = (id: string) => {
    mutate(`api/chats/chat/messages/${id}`);
  };
  return (
    <>
      <BackHeader title="username" />
      <main className="chats">
        <Messages />
        <ChatInput onMessageSent={onMessageSent} />
      </main>
    </>
  );
};

export default Chat;
