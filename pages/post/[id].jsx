import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import BackHeader from "../../components/layout/header/BackHeader";
import API from "../../requests/API";

const Post = () => {
  const router = useRouter();
  const [post, SetPost] = useState();

  useEffect(() => {
    const getPost = async (ID) => {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      var result = await API(option, `api/posts/${ID}`);

      if (result.status == 200) {
        SetPost(result.data.posts);
      }
    };

    getPost(router.query.id);
  }, []);
  return (
    <div className="post-page">
      <BackHeader title={"Post"} />
      <Post
        details={post}
        key={post._id}
        onDelete={() => {
          router.push("/");
        }}
      />
      <Footer />
    </div>
  );
};

export default Post;
