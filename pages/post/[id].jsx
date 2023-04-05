import { useRouter } from "next/router";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import Post from "../../components/posts/Post";
import BackHeader from "../../components/layout/header/BackHeader";
import getRequest from "../../functions/requests/getRequest";
import { getCookie } from "cookies-next";

const PostPage = ({ post, isLoggedIn }) => {
  const router = useRouter();

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

PostPage.getInitialProps = async ({ query, req, res }) => {
  const userID = query.id;
  const result = await getRequest(`api/posts/${userID}`);
  let isLoggedIn = false;

  if (getCookie("cookieToken", { req, res })) {
    isLoggedIn = true;
  }

  if (result?.status != 200) {
    return {
      notFound: true,
    };
  }

  return {
    post: result.data.post,
    isLoggedIn: isLoggedIn,
  };
};

export default PostPage;
