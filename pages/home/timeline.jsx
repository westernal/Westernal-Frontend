import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Post from "../../components/posts/Post";
import Head from "next/head";
import ContentLoader from "../../components/layout/loader/ContentLoader";
import { useRouter } from "next/router";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";
import useAuth from "../../hooks/useAuth";

export default function Index() {
  const [posts, SetPosts] = useState();
  const router = useRouter();
  const render = useAuth(router);

  async function getPosts(userId) {
    const result = await getRequest(`api/posts/timeline/${userId}`, true);

    if (result?.status == 200) {
      SetPosts(result.data.posts);
    }
  }

  useEffect(() => {
    if (render) {
      const userId = decodeJWT(localStorage.getItem("token")).userId;
      getPosts(userId);
    }
  }, [render]);
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
            return <Post post={post} key={post._id} onDelete={getPosts} />;
          })}
        </section>
        <BackToTopButton />
      </main>
      {render ? <Footer /> : null}
    </>
  );
}
