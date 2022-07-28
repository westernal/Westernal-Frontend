import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import API from "../../requests/API";
import User from "../../components/User/users";

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
    if (searchInput === "") {
      SetIstyped(false);
    }
  }
  return (
    <div className="search">
      <div className="search-bar flex">
        <input
          type="text"
          placeholder="Search users..."
          onChange={searchUsers}
        />
      </div>
      {isTyped && <User users={result} />}
      <div className="mb-100"></div>
      <Footer />
    </div>
  );
};

export default Search;
