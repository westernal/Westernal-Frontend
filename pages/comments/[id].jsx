import { useRouter } from "next/router";
import BackHeader from "../../components/layout/BackHeader";
import CommentsList from "../../components/Posts/CommentsList";
import PostComment from "../../components/Posts/PostComment";

const Comments = () => {
  const router = useRouter();

  return (
    <div className="comments">
      <BackHeader title={"comments"} />

      <CommentsList postId={router.query.id} />

      <PostComment postId={router.query.id} />
    </div>
  );
};

export default Comments;
