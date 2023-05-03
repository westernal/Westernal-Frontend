import Link from "next/link";

const NewChat = () => {
  return (
    <Link href={"/user/chats/new"}>
      <button id="top-button" className="active">
        +
      </button>
    </Link>
  );
};

export default NewChat;
