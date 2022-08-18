import { useRouter } from "next/router";
import BackHeader from "../../components/layout/BackHeader";
import CommentsList from "../../components/posts/comments/CommentsList";
import PostComment from "../../components/posts/comments/PostComment";
import Head from "next/head";
import { useState } from "react";
import CheckToken from "../../components/authentication/CheckToken";

const Comments = () => {
  const router = useRouter();
  const [rerender, SetRerender] = useState(false);
  const [isReply, SetIsReply] = useState(false);
  const [repliedComment, SetRepliedComment] = useState("");

  CheckToken();

  const onReply = (id) => {
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
    <div className="comments">
      <Head>
        <title>Comments - Westernal</title>
      </Head>

      <BackHeader title={"comments"} />

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
    </div>
  );
};

export default Comments;
