import { useState } from "react";
import Image from "next/dist/client/image";
import FormLoader from "../../layout/loader/FormLoader";
import { useSearchContext } from "../../../context/searchMusicContext";

const SearchArtists = ({ token }) => {
  const [artists, setArtists] = useState([]);
  const [loader, SetLoader] = useState(false);
  const { closeModal, chooseSong } = useSearchContext();

  const search = async () => {
    const input = document.getElementById("search-input");
    let response;

    if (artists.length == 0) {
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
      }&type=artist&limit=10`,
      option
    );

    const data = await response.json();
    console.log(data);

    const status = response.status;

    if (status == 200) {
      setArtists(data.artists.items);
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
          autoComplete={"off"}
        />
      </div>
      <div className="search-results">
        {loader && <FormLoader />}
        {artists.map((artist) => {
          return (
            <a
              href="#"
              key={artist.id}
              onClick={(e) => {
                e.preventDefault();
                chooseSong(artist.external_urls.spotify);
                closeModal();
              }}
            >
              <div className="profile-notif artist-info">
                <div className="searched-song">
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
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
};

export default SearchArtists;
