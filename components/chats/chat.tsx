import Link from "next/link";
import { Chat } from "../../interfaces/interface";

const Conversation = ({ chat }: { chat: Chat }) => {
  return <Link href={`/${chat._id}`}>user</Link>;
};

export default Conversation;
