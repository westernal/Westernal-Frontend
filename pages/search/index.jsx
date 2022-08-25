import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import API from "../../requests/API";
import User from "../../components/user/Users";
import Head from "next/head";

const Search = () => {
  const [users, SetUsers] = useState();
  const [isTyped, SetIstyped] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }
  }, []);

  async function searchUsers(e) {
    const searchInput = e.target.value.toLowerCase();
    SetIstyped(true);
    const option = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    var result = await API(option, `api/users/search/${searchInput}`);
    console.log(result);

    if (result.status == 200) {
      SetUsers(result.data.users);
    }
    if (searchInput === "") {
      SetIstyped(false);
    }
  }
  return (
    <div className="search">
      <Head>
        <title>Westernal - Search</title>
      </Head>
      <div className="search-bar flex">
        <input
          type="text"
          placeholder="Search users..."
          onChange={searchUsers}
        />
      </div>
      {isTyped && <User users={users} />}
      <div className="mb-100"></div>
      <Footer />
    </div>
  );
};

export default Search;
