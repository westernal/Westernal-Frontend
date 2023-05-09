import { useRouter } from "next/router";
import decodeJWT from "../../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import postRequest from "../../../functions/requests/postRequest";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ChatInput = ({ onMessageSent, socket }) => {
  const router = useRouter();
  const [senderId, SetSenderId] = useState<string>();

  useEffect(() => {
    const id = decodeJWT(getCookie("cookieToken").toString()).userId;
    SetSenderId(id);
  }, []);

  const sendMessage = async () => {
    const message = (
      document.getElementById("comment-text") as HTMLInputElement
    ).value;

    if (!message) {
      return;
    }

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
      socket.emit("sendMessage", {
        senderId: senderId,
        receiverId: result.data.receiverId,
        text: message,
      });
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
