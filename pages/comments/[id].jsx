import { useRouter } from "next/router";
import BackHeader from "../../components/layout/header/BackHeader";
import CommentsList from "../../components/posts/comments/CommentsList";
import PostComment from "../../components/posts/comments/PostComment";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import checkPermission from "../../functions/checkPermission";

const Comments = () => {
  const router = useRouter();
  const [rerender, SetRerender] = useState(false);
  const [isReply, SetIsReply] = useState(false);
  const [firstRender, setFirstRender] = useState(false);
  const [repliedComment, SetRepliedComment] = useState("");

  useEffect(() => {
    setFirstRender(checkPermission(router));
  }, []);

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
    <>
      <Head>
        <title>Westernal - Comments</title>
      </Head>
      <BackHeader title={"comments"} />
      <main className="comments">
        {firstRender && (
          <CommentsList
            postId={router.query.id}
            rerender={rerender}
            onReply={onReply}
          />
        )}

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
