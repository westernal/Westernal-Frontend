import { useRouter } from "next/router";
import decodeJWT from "../../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import postRequest from "../../../functions/requests/postRequest";
import { toast } from "react-toastify";

const ChatInput = ({ onMessageSent }) => {
  const router = useRouter();

  const sendMessage = async () => {
    const senderId = decodeJWT(getCookie("cookieToken").toString()).userId;
    const message = (
      document.getElementById("comment-text") as HTMLInputElement
    ).value;
    const result = await postRequest(
      {
        chatId: router.query.id,
        sender: { id: senderId },
        text: message,
      },
      `api/chats/message/send`,
      true
    );

    if (result?.status == 200) {
      (document.getElementById("comment-text") as HTMLInputElement).value = "";
      onMessageSent(router.query.id);
    } else {
      toast.error(result.data.message);
    }
  };

  const handleEnter = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="post-comment flex">
      <input
        type="text"
        placeholder="Message"
        id="comment-text"
        onKeyDown={handleEnter}
        autoComplete={"off"}
      />
      <div className="comment-buttons">
        <button className="btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </section>
  );
};

export default ChatInput;
