import { useEffect } from "react";
import { useState } from "react";
import Image from "next/dist/client/image";

const SearchSong = ({ hide, chooseSong }) => {
  const [songs, SetSongs] = useState([]);
  const [token, SetToken] = useState("");
  const clientToken =
    "355a112f4a27485cbbb614e817d439c8:f12328b921684083802df0f82574a6ee";

  useEffect(() => {
    const getToken = async () => {
      const option = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic" + " " + new Buffer(clientToken).toString("base64"),
        },
        body: "grant_type=client_credentials",
        json: true,
      };

      const response = await fetch(
        `https://accounts.spotify.com/api/token`,
        option
      );

      const data = await response.json();

      const status = response.status;

      if (status == 200) {
        SetToken(data.access_token);
        search();
      }
    };

    getToken();
  }, []);

  const closeModal = (e) => {
    e.preventDefault();
    hide();
  };

  window.onclick = function (event) {
    if (event.target == document.getElementById("delete-modal")) {
      hide();
    }
  };
  const search = async () => {
    const input = document.getElementById("search-input").value;
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${
        input && input
      }&type=track&limit=10`,
      option
    );

    const data = await response.json();

    const status = response.status;

    if (status == 200) {
      SetSongs(data.tracks.items);
    }
  };

  return (
    <div className="delete-modal" id="delete-modal">
      <div className="modal-text search-modal">
        <a href="#" onClick={closeModal} className="close">
          &times;
        </a>
        <div className="flex song-search">
          <input
            type="text"
            placeholder="Search a song..."
            id="search-input"
            onChange={search}
          />
        </div>
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
    </div>
  );
};

export default SearchSong;
