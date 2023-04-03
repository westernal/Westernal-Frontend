import { toast } from "react-toastify";
import { useEffect } from "react";
import decodeJWT from "../../../functions/decodeJWT";
import postRequest from "../../../functions/requests/postRequest";
import Cookies from "js-cookie";

const PostComment = ({
  postId,
  onPost,
  isReply,
  onCancelReply,
  repliedComment,
}) => {
  useEffect(() => {
    if (isReply) {
      document.getElementById("comment-text").focus();
    }
  }, [isReply]);

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      checkInput();
    }
  };

  const checkInput = () => {
    const message = document.getElementById("comment-text").value;

    if (message === "") {
      toast.error("Comment input is empty!");
    } else {
      if (isReply) {
        sendReply(message);
      } else sendComment(message);
    }
  };

  const sendComment = async (message) => {
    const writerId = decodeJWT(Cookies.get("token")).userId;
    const result = await postRequest(
      {
        writerId: writerId,
        postId: postId,
        message: message,
      },
      `api/comments`,
      true
    );

    if (result?.status == 201) {
      toast.success(`Comment posted!`);
      document.getElementById("comment-text").value = "";
      onPost();
    } else {
      toast.error(result.data.message);
    }
  };

  const sendReply = async (message) => {
    const writerId = decodeJWT(Cookies.get("token")).userId;

    const result = await postRequest(
      {
        writerId: writerId,
        postId: postId,
        message: message,
        commentId: repliedComment,
      },
      `api/comments/replies`,
      true
    );

    if (result?.status == 201) {
      toast.success(`Comment posted!`);
      document.getElementById("comment-text").value = "";
      onCancelReply();
      onPost();
    } else {
      toast.error(result.data.message);
    }
  };

  return (
    <section className="post-comment flex">
      <input
        type="text"
        placeholder={`Write a ${isReply ? "reply" : "comment"}...`}
        id="comment-text"
        onKeyDown={handleEnter}
        autoComplete={"off"}
      />
      <div className="comment-buttons">
        <button className="btn" onClick={checkInput}>
          Post
        </button>
        {isReply ? (
          <button id="cancel-delete" onClick={onCancelReply}>
            Cancel
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default PostComment;
