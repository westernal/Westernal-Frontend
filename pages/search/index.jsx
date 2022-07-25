import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import API from "../../requests/API";
import Post from "../../components/Posts/Post";

const Search = () => {
  const [users, SetUsers] = useState([]);
  const [result, SetResult] = useState([]);
  const [isTyped, SetIstyped] = useState(false);

  useEffect(() => {
    async function getUsers(params) {
      const option = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      var result = await API(option, "api/users");

      if (result.status == 200) {
        SetUsers(result.data.users);
      }
    }
    getUsers();
  }, []);

  function searchUsers(e) {
    const searchInput = e.target.value.toUpperCase();
    SetIstyped(true);
    SetResult(
      users.filter((user) => {
        if (user.username.toUpperCase().indexOf(searchInput) > -1) {
          return user.username.toUpperCase().indexOf(searchInput) > -1;
        }
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
              <Post details={post} />
            </div>
          );
        })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Search;
