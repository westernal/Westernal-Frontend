import { useState } from "react";
import useSearchUsers from "../../../hooks/useSearchUsers";
import { useRouter } from "next/router";
import Image from "next/image";
import Members from "../../../components/chats/conversation/members";
import Head from "next/head";

const NewChat = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { isTyped, users } = useSearchUsers(searchTerm);
  const router = useRouter();

  return (
    <main className="new-chat">
      <Head>
        <title>Westernal - Create Chat</title>
      </Head>
      <div className="search-bar flex">
        <button
          id="back-link"
          aria-label="back"
          onClick={() => {
            router.back();
          }}
        >
          <Image
            src="/Images/back.svg"
            alt="back button"
            width={20}
            height={20}
          />
        </button>
        <input
          type="text"
          placeholder="Search users..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          id="searchInput"
          autoComplete={"off"}
        />
      </div>

      {isTyped ? <Members users={users} /> : null}
    </main>
  );
};

export default NewChat;
