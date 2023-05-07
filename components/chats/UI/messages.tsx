import Message from "./message";
import { Message as MessageType } from "../../../interfaces/interface";

const Messages = ({ messages }) => {
  return (
    <section className="messages">
      {messages.map((message: any, index: number) => {
        return <Message message={message} key={index} />;
      })}
    </section>
  );
};

export default Messages;
