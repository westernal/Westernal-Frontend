import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Post from "../../components/Posts/Post";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";

export default function Index() {
  const [posts, SetPosts] = useState([
    {
      title: "",
      description: "",
      image: "",
      _id: "0",
      creator: "",
      date: "",
      likes: [],
    },
  ]);
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
  }, []);
  return (
    <div className="home">
      <Header />

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <Post details={post} />
          </div>
        );
      })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
}
