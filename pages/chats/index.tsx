import { getCookie } from "cookies-next";
import getRequest from "../../functions/requests/getRequest";
import { Chat } from "../../interfaces/interface";
import BackHeader from "../../components/layout/header/BackHeader";
import Conversation from "../../components/chats/chat";

const Chats = ({ chats }: { chats: Chat[] }) => {
  return (
    <main>
      <BackHeader title={"Chats"} />
      Soon will be chats...
      {chats.map((chat) => {
        return <Conversation chat={chat} key={chat._id} />;
      })}
    </main>
  );
};

Chats.getInitialProps = async (req, res) => {
  const userId = getCookie("cookieToken", { req, res });
  const result = await getRequest(`api/chats/${userId}`);

  // if (result?.status == 404 || !result) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    chats: [],
  };
};

export default Chats;
