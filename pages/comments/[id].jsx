import { useRouter } from "next/router";
import BackHeader from "../../components/layout/BackHeader";
import CommentsList from "../../components/Posts/CommentsList";
import PostComment from "../../components/Posts/PostComment";
import Head from "next/head";

const Comments = () => {
  const router = useRouter();

  return (
    <div className="comments">
      <Head>
        <title>Comments</title>
      </Head>
      <BackHeader title={"comments"} />

      <CommentsList postId={router.query.id} />

      <PostComment postId={router.query.id} />
    </div>
  );
};

export default Comments;
