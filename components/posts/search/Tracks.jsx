import { useState } from "react";
import FormLoader from "../../layout/loader/FormLoader";
import SearchItems from "./Items/SearchItems";

const SearchTracks = ({ token, chooseSong, hide }) => {
  const [songs, SetSongs] = useState([]);
  const [loader, SetLoader] = useState(false);

  const search = async () => {
    const input = document.getElementById("search-input");
    let response;

    if (songs.length == 0) {
      SetLoader(true);
    }

    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    response = await fetch(
      `https://api.spotify.com/v1/search?q=${
        input.value && input.value
      }&type=track&limit=10`,
      option
    );

    const data = await response.json();

    const status = response.status;

    if (status == 200) {
      SetSongs(data.tracks.items);
      SetLoader(false);
    }
  };

  return (
    <>
      <div className="flex song-search">
        <input
          type="text"
          placeholder="Search a track..."
          id="search-input"
          onChange={search}
          autoComplete={"off"}
        />
      </div>
      <div className="search-results">
        {loader && <FormLoader />}
        {songs.map((song) => {
          return (
            <SearchItems
              song={song}
              chooseSong={chooseSong}
              hide={hide}
              key={song.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default SearchTracks;
