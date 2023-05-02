import { getCookie } from "cookies-next";
import getRequest from "../../functions/requests/getRequest";

const Chats = ({ chats }: { chats: any }) => {
  return <main>hello</main>;
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
