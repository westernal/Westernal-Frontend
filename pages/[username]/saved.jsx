import { useEffect } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import { useState } from "react";
import Post from "../../components/posts/Post";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import PostLoader from "../../components/layout/loader/ContentLoader";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import { useRouter } from "next/router";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";
import useAuth from "../../hooks/useAuth";

const Saved = () => {
  const [posts, SetPosts] = useState();
  const router = useRouter();
  const render = useAuth(router, true);

  const getSavedPosts = async () => {
    var token = localStorage.getItem("token");
    const userID = decodeJWT(token).userId;
    const result = await getRequest(`api/users/saved-posts/${userID}`, true);

    if (result?.status == 200) {
      SetPosts(result.data.posts);
    }
  };

  useEffect(() => {
    if (render) {
      getSavedPosts();
    }
  }, [render]);

  return (
    <>
      <Head>
        <title>Westernal - Saved Posts</title>
      </Head>
      <BackHeader title={"Saved Posts"} />
      <main className="saved-posts">
        <section className="post-list flex">
          {!posts
            ? [1, 2, 3].map((index) => {
                return (
                  <div className="post" key={index}>
                    <PostLoader />
                  </div>
                );
              })
            : null}

          {posts?.map((post) => {
            return (
              <Post
                post={post}
                onDelete={getSavedPosts}
                key={post._id}
                onUnsave={getSavedPosts}
              />
            );
          })}
        </section>
        <BackToTopButton />
      </main>
      {render ? <Footer /> : null}
    </>
  );
};

export default Saved;
