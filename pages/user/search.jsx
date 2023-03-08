import { useState } from "react";
import Footer from "../../components/layout/Footer";
import User from "../../components/user/Users";
import Head from "next/head";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import useSearchUsers from "../../hooks/useSearchUsers";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const render = useAuth(router);
  const [isTyped, users] = useSearchUsers(searchTerm);

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
              setSearchTerm(event.target.value);
            }}
            id="searchInput"
            autoComplete={"off"}
          />
        </div>
        {isTyped ? <User users={users} /> : null}
      </main>
      {render ? <Footer /> : null}
    </>
  );
};

export default Search;
