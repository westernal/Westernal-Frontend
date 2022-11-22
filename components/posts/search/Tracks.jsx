import { useState } from "react";
import Image from "next/dist/client/image";
import FormLoader from "../../layout/loader/FormLoader";

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
        />
      </div>
      <div className="search-results">
        {loader && <FormLoader />}
        {songs.map((song) => {
          return (
            <a
              href="#"
              key={song.id}
              onClick={(e) => {
                e.preventDefault();
                chooseSong(song.external_urls.spotify);
                hide();
              }}
            >
              <div className="profile-notif grid">
                <Image
                  alt="song's cover"
                  src={song.album.images[0].url}
                  width={60}
                  height={60}
                  id={"song-cover"}
                />
                <div className="song-info">
                  <p>{song.name}</p>
                  <p id="artist">
                    {song.artists.map((artist, index, array) =>
                      index == array.length - 1
                        ? artist.name
                        : `${artist.name} feat. `
                    )}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default SearchTracks;
