import { useState } from "react";
import Image from "next/dist/client/image";
import { toast } from "react-toastify";

const SearchArtists = ({ token, chooseSong, hide }) => {
  const [artists, setArtists] = useState([]);
  const [loader, SetLoader] = useState(false);

  const search = async () => {
    if (artists.length == 0) {
      SetLoader(true);
    }

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
        }&type=artist&limit=10`,
        option
      );
    } catch (error) {
      toast.error("Server error, please reload the page");
      SetLoader(false);
      return;
    }

    const data = await response.json();

    const status = response.status;

    if (status == 200) {
      setArtists(data.artists.items);
      SetLoader(false);
    } else {
      toast.error(data.message);
      SetLoader(false);
    }
  };

  return (
    <>
      <div className="flex song-search">
        <input
          type="text"
          placeholder="Search an artist..."
          id="search-input"
          onChange={search}
        />
      </div>
      <div className="search-results">
        {loader && (
          <div className="flex">
            <div className="logo-loader flex">
              <p id="loader">w</p>
            </div>
          </div>
        )}
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
      </div>
    </>
  );
};

export default SearchArtists;
