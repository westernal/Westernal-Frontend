import { useState } from "react";
import Footer from "../../components/layout/Footer";
import User from "../../components/user/Users";
import Head from "next/head";
import useSearchUsers from "../../hooks/useSearchUsers";
import SearchExplore from "../../components/user/search/searchExplore";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { isTyped, users } = useSearchUsers(searchTerm);

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
        {isTyped ? <User users={users} /> : <SearchExplore />}
      </main>
      <Footer classnames="footer search" />
    </>
  );
};

export default Search;
