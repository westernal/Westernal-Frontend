import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import BackHeader from "../../components/layout/header/BackHeader";
import API from "../../requests/API";
import Head from "next/head";

const Post = () => {
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
      console.log(result);

      if (result.status == 200) {
        SetPost(result.data.post);
      }
    };
    console.log(router.query);

    if (router.query.id) {
      getPost();
    }
  }, [router.query]);

  return (
    <div className="post-page">
      <Head>
        <title>Westernal - Post</title>
      </Head>
      <BackHeader title={"Post"} />
      {post && (
        <Post
          details={post}
          key={post._id}
          onDelete={() => {
            router.push("/");
          }}
          isLoggedIn={isLoggedIn}
        />
      )}
      <Footer />
    </div>
  );
};

export default Post;
