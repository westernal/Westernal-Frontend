import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Post from "../../components/posts/Post";
import Head from "next/head";
import ContentLoader from "../../components/layout/loader/ContentLoader";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";

export default function Index() {
  const [posts, SetPosts] = useState();

  async function getPosts(userId) {
    const result = await getRequest(`api/posts/timeline/${userId}`, true);

    if (result?.status == 200) {
      SetPosts(result.data.posts);
    }
  }

  useEffect(() => {
    const userId = decodeJWT(localStorage.getItem("token")).userId;
    getPosts(userId);
  }, []);

  const onDeletePost = (id) => {
    const newPosts = posts.filter((post) => {
      return post._id != id;
    });

    SetPosts(newPosts);
  };

  return (
    <>
      <Header showLogo={true} />
      <Head>
        <title>Westernal: Let the songs talk</title>
      </Head>
      <main className="home">
        <section className="post-list flex">
          {!posts
            ? [1, 2, 3].map((elem, index) => {
                return (
                  <div className="post" key={index}>
                    <ContentLoader />
                  </div>
                );
              })
            : null}

          {posts?.map((post) => {
            return <Post post={post} key={post._id} onDelete={onDeletePost} />;
          })}
        </section>
        <BackToTopButton />
      </main>
      <Footer />
    </>
  );
}
