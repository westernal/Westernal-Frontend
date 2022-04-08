import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import API from "../../requests/API";
import Post from "../../components/Posts/Post";

const Search = () => {
  const [posts, SetPosts] = useState([
    { title: "", description: "", image: "" },
  ]);
  const [result, SetResult] = useState([
    { title: "", description: "", image: "" },
  ]);
  const [isTyped, SetIstyped] = useState(false);

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
  function searchPosts(e) {
    const searchInput = e.target.value.toUpperCase();
    SetIstyped(true);
    SetResult(
      posts.filter((post) => {
        return post.title.indexOf(searchInput) > -1;
      })
    );
  }
  return (
    <div className="search">
      <div className="search-bar flex">
        <input type="text" placeholder="Search..." onChange={searchPosts} />
      </div>

      {isTyped &&
        result.map((post) => {
          return (
            <div key={post._id}>
              <Post
                image={post.image}
                date={"4/4/2022"}
                title={post.title}
                description={post.description}
              />
            </div>
          );
        })}

      <Footer />
    </div>
  );
};

export default Search;
