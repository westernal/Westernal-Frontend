import { useState, useEffect, useRef } from "react";
import FormLoader from "../../layout/loader/FormLoader";
import SearchItems from "./Items/SearchItems";

const SearchTracks = ({ token }) => {
  const [songs, SetSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, SetLoader] = useState(false);
  const controllerRef = useRef();

  const search = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    let response;

    if (songs.length == 0) {
      SetLoader(true);
    }

    const option = {
      signal: controllerRef.current?.signal,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    response = await fetch(
      `https://api.spotify.com/v1/search?q=${
        searchTerm && searchTerm
      }&type=track&limit=10`,
      option
    );

    const data = await response.json();
    const status = response.status;

    if (status == 200) {
      SetSongs(data.tracks.items);
      controllerRef.current = null;
    }

    SetLoader(false);
  };

  useEffect(() => {
    if (searchTerm) {
      search();
    }
  }, [searchTerm]);

  return (
    <section>
      <div className="flex song-search">
        <input
          type="text"
          placeholder="Search a track..."
          id="search-input"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          autoComplete={"off"}
        />
      </div>
      <div className="search-results">
        {loader ? <FormLoader /> : null}
        {songs.map((song) => {
          return <SearchItems song={song} key={song.id} />;
        })}
      </div>
    </section>
  );
};

export default SearchTracks;
