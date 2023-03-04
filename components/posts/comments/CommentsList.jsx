import { useEffect, useState } from "react";
import API from "../../../requests/API";
import Comment from "./Comment";
import NotifLoader from "../../layout/loader/NotifLoader";

const CommentsList = ({ postId, rerender, onReply }) => {
  const [comments, SetComments] = useState();
  const [deleted, SetDeleted] = useState(false);

  const onDelete = () => {
    SetDeleted(!deleted);
  };

  useEffect(() => {
    const getComments = async () => {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        mode: "cors",
        credentials: "include",
      };

      var result = await API(option, `api/comments/${postId}`);

      if (result.status == 200) {
        SetComments(result.data.comments);
      }
    };

    if (postId) {
      getComments();
    }
  }, [rerender, postId, deleted]);
  return (
    <section className="cm-list">
      {!comments &&
        [1, 2, 3, 4, 5, 6, 7].map((elem, index) => {
          return (
            <div className="profile-notif flex" key={index}>
              <NotifLoader />
            </div>
          );
        })}
      {comments &&
        comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment._id}
            onDelete={onDelete}
            onReply={onReply}
          />
        ))}
    </section>
  );
};

export default CommentsList;
