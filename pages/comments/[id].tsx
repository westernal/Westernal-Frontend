import { useRouter } from "next/router";
import BackHeader from "../../components/layout/header/BackHeader";
import CommentsList from "../../components/posts/comments/CommentsList";
import PostComment from "../../components/posts/comments/PostComment";
import { useState } from "react";

const Comments = () => {
  const router: any = useRouter();
  const [rerender, SetRerender] = useState(false);
  const [isReply, SetIsReply] = useState(false);
  const [repliedComment, SetRepliedComment] = useState("");

  const onReply = (id: string) => {
    SetIsReply(true);
    SetRepliedComment(id);
  };

  const onCancelReply = () => {
    SetIsReply(false);
  };

  const render = () => {
    SetRerender(!rerender);
  };

  return (
    <>
      <BackHeader title={"Comments"} />
      <main className="comments">
        <CommentsList
          postId={router.query.id}
          rerender={rerender}
          onReply={onReply}
        />

        <div className="mb-100"></div>

        <PostComment
          postId={router.query.id}
          onPost={render}
          isReply={isReply}
          repliedComment={repliedComment}
          onCancelReply={onCancelReply}
        />
      </main>
    </>
  );
};

export default Comments;
