import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Post from "../../components/posts/Post";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import Head from "next/head";
import ContentLoader from "../../components/layout/ContentLoader";
import CheckToken from "../../components/authentication/CheckToken";

export default function Index() {
  const [posts, SetPosts] = useState();
  const [refresh, SetRefresh] = useState(false);

  CheckToken();

  const onRefresh = () => {
    SetRefresh(!refresh);
  };

  useEffect(() => {
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
    getPosts(jwt_decode(localStorage.getItem("token")).userId);
  }, [refresh]);
  return (
    <div className="home">
      <Header refresh={onRefresh} />
      <Head>
        <title>Westernal</title>
      </Head>

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
          return <Post details={post} key={post._id} />;
        })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
}
