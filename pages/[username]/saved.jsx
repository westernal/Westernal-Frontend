import { useEffect } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import API from "../../requests/API";
import Post from "../../components/posts/Post";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import PostLoader from "../../components/layout/loader/ContentLoader";

const Saved = () => {
  const [posts, SetPosts] = useState();

  const getSavedPosts = async (userId) => {
    var token = localStorage.getItem("token");
    const userID = jwtDecode(token).userId;

    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/users/saved-posts/${userID}`);

    if (result.status == 200) {
      SetPosts(result.data.posts);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }

    getSavedPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Westernal - Saved Posts</title>
      </Head>
      <BackHeader title={"Saved Posts"} />
      <main className="saved-posts">
        <section className="post-list flex">
          {!posts &&
            [1, 2, 3].map((index) => {
              return (
                <div className="post" key={index}>
                  <PostLoader />
                </div>
              );
            })}

          {posts &&
            posts.map((post) => {
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
      </main>
      <Footer />
    </>
  );
};

export default Saved;
