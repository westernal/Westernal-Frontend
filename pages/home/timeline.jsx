import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Post from "../../components/posts/Post";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import Head from "next/head";
import ContentLoader from "../../components/layout/loader/ContentLoader";
import { useRouter } from "next/router";

export default function Index() {
  const [posts, SetPosts] = useState();
  const router = useRouter();

  async function getPosts(userId) {
    const option = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    var result = await API(option, `api/posts/timeline/${userId}`);
    console.log(result);

    if (result.status == 200) {
      SetPosts(result.data.posts);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }

    getPosts(jwt_decode(localStorage.getItem("token")).userId);
  }, [router]);
  return (
    <>
      <Header showLogo={true} />
      <Head>
        <title>Westernal: Let the songs talk</title>
      </Head>
      <main className="home">
        <section className="post-list flex">
          {!posts &&
            [1, 2, 3].map((elem, index) => {
              return (
                <div className="post" key={index}>
                  <ContentLoader />
                </div>
              );
            })}

          {posts &&
            posts.map((post) => {
              return <Post post={post} key={post._id} onDelete={getPosts} />;
            })}
        </section>
      </main>
      <Footer />
    </>
  );
}
