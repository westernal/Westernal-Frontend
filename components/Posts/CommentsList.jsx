import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../../requests/API";
import dateFormat from "dateformat";

const CommentsList = ({ postId, rerender }) => {
  const [comments, SetComments] = useState([]);
  const host = "http://localhost:5000/";

  const getComments = async () => {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/comments/${postId}`);

    if (result.status == 200) {
      SetComments(result.data.comments);
    }
  };

  useEffect(() => {
    if (postId) {
      getComments();
    }
  }, [rerender, postId]);
  return (
    <div className="cm-list">
      {comments.map((comment) => (
        <div className="comment flex" key={comment._id}>
          <div className="cm-main flex">
            <Link
              href={`/profile/${comment.writer.username}/${comment.writer.id}`}
            >
              <a className="flex">
                <Image
                  src={host + comment.writer.avatar}
                  width={50}
                  height={50}
                  id="avatar"
                />
                <p id="cm-user">{comment.writer.username}:</p>
              </a>
            </Link>
            <p>{comment.message}</p>
          </div>
          <p id="date">{dateFormat(comment.date, "mmm d, yyyy")}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
