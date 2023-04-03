import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import Post from "../../components/posts/Post";
import BackHeader from "../../components/layout/header/BackHeader";
import getRequest from "../../functions/requests/getRequest";
import Cookies from "js-cookie";

const PostPage = ({ post }) => {
  const router = useRouter();
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get("cookieToken").toString()) {
      SetIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Westernal - {post ? `Post from ${post.author.username}` : "Post"}
        </title>
        {post?.caption ? (
          <meta name="description" content={`${post.caption}`} />
        ) : null}
      </Head>

      <BackHeader title={"Post"} />
      <main className="post-page home">
        <section className="post-list flex">
          {post ? (
            <Post
              post={post}
              key={post._id}
              onDelete={() => {
                router.push("/");
              }}
              isLoggedIn={isLoggedIn}
            />
          ) : null}
        </section>
      </main>
      {isLoggedIn ? <Footer /> : null}
    </>
  );
};

PostPage.getInitialProps = async (context) => {
  const userID = context.query.id;
  const result = await getRequest(`api/posts/${userID}`);

  if (result?.status != 200) {
    return {
      notFound: true,
    };
  }

  return {
    post: result.data.post,
  };
};

export default PostPage;
