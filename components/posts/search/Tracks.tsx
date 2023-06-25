import { useState } from "react";
import FormLoader from "../../layout/loader/FormLoader";
import SearchItems from "./Items/SearchItems";
import useSearchSongs from "../../../hooks/useSearchSongs";

const SearchTracks = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loader, data } = useSearchSongs(searchTerm, "track", token);

  return (
    <section>
      <div className="flex song-search">
        <input
          type="search"
          placeholder="Search a track..."
          id="search-input"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          autoComplete={"off"}
        />
      </div>
      <section className="search-results">
        {loader ? <FormLoader /> : null}
        {data?.tracks?.items.map((song) => {
          return <SearchItems song={song} key={song.id} />;
        })}
      </section>
    </section>
  );
};

export default SearchTracks;
