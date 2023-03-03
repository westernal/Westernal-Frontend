import { toast } from "react-toastify";
import API from "../../../requests/API";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

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
    const writerId = jwtDecode(localStorage.getItem("token")).userId;
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        writerId: writerId,
        postId: postId,
        message: message,
      }),
      mode: "cors",
      credentials: "include",
    };

    try {
      var result = await API(option, `api/comments`);
    } catch (error) {
      toast.error("Server error! please try again.");
      return;
    }

    if (result && result.status == 201) {
      toast.success(`Comment posted!`);
      document.getElementById("comment-text").value = "";
      onPost();
    } else {
      toast.error(result.data.message);
    }
  };

  const sendReply = async (message) => {
    const writerId = jwtDecode(localStorage.getItem("token")).userId;
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        writerId: writerId,
        postId: postId,
        message: message,
        commentId: repliedComment,
      }),
      mode: "cors",
      credentials: "include",
    };

    try {
      var result = await API(option, `api/comments/replies`);
    } catch (error) {
      toast.error("Server error! please try again.");
      return;
    }

    if (result && result.status == 201) {
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
        {isReply && (
          <button id="cancel-delete" onClick={() => onCancelReply()}>
            Cancel
          </button>
        )}
      </div>
    </section>
  );
};

export default PostComment;
