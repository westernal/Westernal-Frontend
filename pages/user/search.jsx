import { useEffect, useRef, useState } from "react";
import Footer from "../../components/layout/Footer";
import API from "../../requests/API";
import User from "../../components/user/Users";
import Head from "next/head";
import { useRouter } from "next/router";
import checkPermission from "../../Functions/checkPermission";

const Search = () => {
  const [users, SetUsers] = useState();
  const [isTyped, SetIsTyped] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const controllerRef = useRef();

  async function searchUsers(e) {
    SetIsTyped(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const option = {
      signal: controllerRef.current?.signal,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      var result = await API(option, `api/users/search/${searchTerm}`);
    } catch (error) {
      return;
    }

    if (result.status == 200) {
      SetUsers(result.data.users);
      controllerRef.current = null;
    }

    if (searchTerm === "") {
      SetIsTyped(false);
    }
  }

  useEffect(() => {
    checkPermission(router);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchUsers();
    }
  }, [searchTerm]);

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
            onChange={(event) => {
              setSearchTerm(event.target.value.toLowerCase());
            }}
            id="searchInput"
            autoComplete={"off"}
          />
        </div>
        {isTyped && <User users={users} />}
      </main>
      <Footer />
    </>
  );
};

export default Search;
