import { useEffect, useState } from "react";
import Comment from "./Comment";
import NotifLoader from "../../layout/loader/NotifLoader";
import getRequest from "../../../functions/requests/getRequest";
import { Comment as CommentType } from "../../../interfaces/interface";

const CommentsList = ({ postId, rerender, onReply }) => {
  const [comments, SetComments] = useState<CommentType[]>();
  const [deleted, SetDeleted] = useState<boolean>(false);

  const onDelete = () => {
    SetDeleted(!deleted);
  };

  useEffect(() => {
    const getComments = async () => {
      const result = await getRequest(`api/comments/${postId}`, true);

      if (result?.status == 200) {
        SetComments(result.data.comments);
      }
    };

    if (postId) {
      getComments();
    }
  }, [rerender, postId, deleted]);
  return (
    <section className="cm-list">
      {!comments
        ? [1, 2, 3, 4, 5, 6, 7].map((elem, index) => {
            return (
              <div className="profile-notif flex" key={index}>
                <NotifLoader />
              </div>
            );
          })
        : null}
      {comments?.map((comment: any) => (
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
