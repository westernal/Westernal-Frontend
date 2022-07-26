import { toast } from "react-toastify";
import API from "../../requests/API";
import jwtDecode from "jwt-decode";

const PostComment = ({ postId, writerId }) => {
  const checkInput = () => {
    const message = document.getElementById("comment-text").value;

    if (message === "") {
      toast.error("Comment input is empty!");
    } else sendComment(message);
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
    };

    try {
      var result = await API(option, `api/comments`);
    } catch (error) {
      toast.error("Server error! please try again.");
      return;
    }

    if (result && result.status == 201) {
      toast.success(`Comment posted!`);
    } else {
      toast.error(result.data.message);
    }
  };
  return (
    <div className="post-comment flex">
      <input type="text" placeholder="Write a comment..." id="comment-text" />
      <button className="btn" onClick={checkInput}>
        Post
      </button>
    </div>
  );
};

export default PostComment;
