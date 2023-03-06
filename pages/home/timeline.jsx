import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Post from "../../components/posts/Post";
import API from "../../requests/API";
import Head from "next/head";
import ContentLoader from "../../components/layout/loader/ContentLoader";
import { useRouter } from "next/router";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import checkPermission from "../../functions/checkPermission";
import decodeJWT from "../../functions/decodeJWT";

export default function Index() {
  const [posts, SetPosts] = useState();
  const [render, setRender] = useState(false);
  const router = useRouter();

  async function getPosts(userId) {
    const option = {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      mode: "cors",
      credentials: "include",
    };

    var result = await API(option, `api/posts/timeline/${userId}`);

    if (result.status == 200) {
      SetPosts(result.data.posts);
    }
  }

  useEffect(() => {
    setRender(checkPermission(router));
  }, []);

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
