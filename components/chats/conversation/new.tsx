import Link from "next/link";

const NewChat = () => {
  return (
    <Link href={"/user/chats/new"}>
      <button id="top-button">+</button>
    </Link>
  );
};

export default NewChat;
