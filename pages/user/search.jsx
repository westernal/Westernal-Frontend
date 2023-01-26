import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import API from "../../requests/API";
import User from "../../components/user/Users";
import Head from "next/head";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Search = () => {
  const [users, SetUsers] = useState();
  const [isTyped, SetIsTyped] = useState(false);
  const router = useRouter();

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
    }

    if (searchInput === "") {
      SetIsTyped(false);
    }
  }
  return (
    <>
      <Head>
        <title>Westernal - Search</title>
      </Head>
      <main className="search">
        <div className="search-bar flex">
          <input
            type="text"
            placeholder="Search users..."
            onChange={searchUsers}
          />
        </div>
        {isTyped && <User users={users} />}
      </main>
      <Footer />
    </>
  );
};

export default Search;
