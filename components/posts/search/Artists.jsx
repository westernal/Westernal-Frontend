import { useState } from "react";
import Image from "next/dist/client/image";

const SearchArtists = ({ token, chooseSong, hide }) => {
  const [artists, setArtists] = useState([]);

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
      }&type=artist&limit=10`,
      option
    );

    const data = await response.json();
    console.log(data);

    const status = response.status;

    if (status == 200) {
      setArtists(data.artists.items);
    }
  };

  return (
    <>
      <div className="flex song-search">
        <input
          type="text"
          placeholder="Search a song..."
          id="search-input"
          onChange={search}
        />
      </div>
      {artists.map((artist) => {
        return (
          <a
            href="#"
            key={artist.id}
            onClick={(e) => {
              e.preventDefault();
              chooseSong(artist.external_urls.spotify);
              hide();
            }}
          >
            <div className="profile-notif artist-info grid">
              <Image
                alt="artist's cover"
                src={artist.images[0] && artist.images[0].url}
                width={60}
                height={60}
                id={"artist-cover"}
              />
              <div className="song-info">
                <p>{artist.name}</p>
              </div>
            </div>
          </a>
        );
      })}
    </>
  );
};

export default SearchArtists;
