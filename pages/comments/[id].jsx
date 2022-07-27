import { useRouter } from "next/router";
import BackHeader from "../../components/layout/BackHeader";
import CommentsList from "../../components/Posts/comments/CommentsList";
import PostComment from "../../components/Posts/comments/PostComment";
import Head from "next/head";
import { useState } from "react";

const Comments = () => {
  const router = useRouter();
  const [rerender, SetRerender] = useState(false);

  const render = () => {
    SetRerender(!rerender);
  };

  return (
    <div className="comments">
      <Head>
        <title>Comments</title>
      </Head>

      <BackHeader title={"comments"} />

      <CommentsList postId={router.query.id} rerender={rerender} />

      <PostComment postId={router.query.id} onPost={render} />
    </div>
  );
};

export default Comments;
