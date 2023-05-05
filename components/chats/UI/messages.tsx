import { useRouter } from "next/router";
import getRequest from "../../../functions/requests/getRequest";
import useSWR from "swr";
import Message from "./message";
import { Message as MessageType } from "../../../interfaces/interface";

const Messages = () => {
  const router = useRouter();
  const {
    data: result,
    isLoading,
    error,
  } = useSWR(
    () => `api/chats/chat/messages/${router.query.id}`,
    (url) => getRequest(url, true)
  );

  return (
    <section className="messages">
      {result?.data?.messages?.map((message: MessageType) => {
        return <Message message={message} key={message._id} />;
      })}
    </section>
  );
};

export default Messages;
