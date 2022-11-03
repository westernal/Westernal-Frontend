import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import API from "../../requests/API";
import User from "../../components/user/Users";
import Head from "next/head";
import { toast } from "react-toastify";

const Search = () => {
  const [users, SetUsers] = useState();
  const [isTyped, SetIsTyped] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }
  }, []);

  async function searchUsers(e) {
    const searchInput = e.target.value.toLowerCase();
    SetIsTyped(true);
    const option = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      var result = await API(option, `api/users/search/${searchInput}`);
    } catch (error) {
      toast.error("Server error, please try again!");
      e.target.blur();
      SetIsTyped(false);
    }

    if (result.status == 200) {
      SetUsers(result.data.users);
    } else {
      toast.error("Server error, please try again!");
      e.target.blur();
      SetIsTyped(false);
    }

    if (searchInput === "") {
      SetIsTyped(false);
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
