import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import API from "../../requests/API";
import Head from "next/head";
import Post from "../../components/posts/Post";
import BackHeader from "../../components/layout/header/BackHeader";

const PostPage = () => {
  const router = useRouter();
  const [post, SetPost] = useState();
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      SetIsLoggedIn(true);
    }

    const getPost = async () => {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      var result = await API(option, `api/posts/${router.query.id}`);

      if (result.status == 200) {
        SetPost(result.data.post);
      } else router.push("/404");
    };

    if (router.query.id) {
      getPost();
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Westernal - Post</title>
      </Head>

      <BackHeader title={"Post"} />
      <main className="post-page home">
        <section className="post-list flex">
          {post && (
            <Post
              post={post}
              key={post._id}
              onDelete={() => {
                router.push("/");
              }}
              isLoggedIn={isLoggedIn}
            />
          )}
        </section>
      </main>
      {isLoggedIn && <Footer />}
    </>
  );
};

export default PostPage;
