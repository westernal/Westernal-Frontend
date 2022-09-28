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
  const [refresh, SetRefresh] = useState(false);
  const router = useRouter();

  const onRefresh = () => {
    SetRefresh(!refresh);
  };

  async function getPosts(userId) {
    const option = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    var result = await API(option, `api/posts/timeline/${userId}`);

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
  }, [refresh, router]);
  return (
    <div className="home">
      <Header refresh={onRefresh} />
      <Head>
        <title>Westernal: Let the songs talk</title>
      </Head>

      <div className="post-list">
        {!posts &&
          [1, 2, 3].map((elem, index) => {
            return (
              <div className="flex" key={index}>
                <div className="post">
                  <ContentLoader />
                </div>
              </div>
            );
          })}

        {posts &&
          posts.map((post) => {
            return <Post details={post} key={post._id} onDelete={getPosts} />;
          })}
      </div>

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
}
