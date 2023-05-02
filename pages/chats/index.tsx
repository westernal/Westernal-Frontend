import { getCookie } from "cookies-next";
import getRequest from "../../functions/requests/getRequest";
import { Chat } from "../../interfaces/interface";
import BackHeader from "../../components/layout/header/BackHeader";

const Chats = ({ chats }: { chats: Chat[] }) => {
  return (
    <main>
      <BackHeader title={"Chats"} />
    </main>
  );
};

Chats.getInitialProps = async (req, res) => {
  const userId = getCookie("cookieToken", { req, res });
  const result = await getRequest(`api/chats/${userId}`);

  if (result?.status == 404 || !result) {
    return {
      notFound: true,
    };
  }

  return {
    chats: result.data.chats,
  };
};

export default Chats;
