import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Post from "../../components/Posts/Post";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import Head from "next/head";
import ContentLoader from "react-content-loader";

export default function Index() {
  const [posts, SetPosts] = useState();
  const [refresh, SetRefresh] = useState(false);
  const [bgColor, SetBgColor] = useState("#f3f3f3");

  const onRefresh = () => {
    SetRefresh(!refresh);
  };

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      SetBgColor("#5f5d5d");
    }

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
                <ContentLoader
                  speed={2}
                  width={"100%"}
                  height={"100%"}
                  viewBox="0 0 320 420"
                  backgroundColor={bgColor}
                  foregroundColor="#ecebeb"
                >
                  <circle cx="25" cy="29" r="11" />
                  <rect x="45" y="25" rx="2" ry="2" width="100" height="10" />
                  <rect x="0" y="54" rx="2" ry="2" width="320" height="276" />
                  <rect x="12" y="345" rx="0" ry="0" width="90" height="12" />
                  <rect x="12" y="365" rx="0" ry="0" width="130" height="10" />
                  <circle cx="20" cy="405" r="9" />
                  <rect x="40" y="397" rx="0" ry="0" width="17" height="17" />
                  <rect x="215" y="400" rx="0" ry="0" width="90" height="12" />
                </ContentLoader>
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
