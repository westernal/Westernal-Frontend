import { useState } from "react";
import Image from "next/dist/client/image";
import { toast } from "react-toastify";

const SearchTracks = ({ token, chooseSong, hide }) => {
  const [songs, SetSongs] = useState([]);

  const search = async () => {
    const input = document.getElementById("search-input").value;
    let response;
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      response = await fetch(
        `https://api.spotify.com/v1/search?q=${
          input && input
        }&type=track&limit=10`,
        option
      );
    } catch (error) {
      toast.error("Server error, please reload the page");
      return;
    }

    const data = await response.json();

    const status = response.status;

    if (status == 200) {
      SetSongs(data.tracks.items);
    } else toast.error(data.message);
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
