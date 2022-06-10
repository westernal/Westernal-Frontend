import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Post from "../../components/Posts/Post";
import API from "../../requests/API";

export default function Index() {
  const [posts, SetPosts] = useState([
    { title: "", description: "", image: "", _id: "0", creator: "", date: "" },
  ]);
  useEffect(() => {
    async function getPosts(params) {
      const option = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      var result = await API(option, "api/posts");

      if (result.status == 200) {
        SetPosts(result.data.posts);
      }
    }
    getPosts();
  }, []);
  return (
    <div className="home">
      <Header />

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <Post
              image={post.image}
              date={post.date}
              title={post.title}
              description={post.description}
              creator={post.creator}
            />
          </div>
        );
      })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
}
