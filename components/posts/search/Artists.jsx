import { useEffect, useState, useRef } from "react";
import Image from "next/dist/client/image";
import FormLoader from "../../layout/loader/FormLoader";
import { useSearchContext } from "../../../context/searchMusicContext";

const SearchArtists = ({ token }) => {
  const [artists, setArtists] = useState([]);
  const [loader, SetLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { closeModal, chooseSong } = useSearchContext();
  const controllerRef = useRef();

  const search = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    let response;

    if (artists.length == 0) {
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
      }&type=artist&limit=10`,
      option
    );

    const data = await response.json();
    const status = response.status;

    if (status == 200) {
      setArtists(data.artists.items);
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
          placeholder="Search an artist..."
          id="search-input"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          autoComplete={"off"}
        />
      </div>
      <div className="search-results">
        {loader ? <FormLoader /> : null}
        {artists.map((artist) => {
          return (
            <div className="profile-notif artist-info" key={artist.id}>
              <div className="searched-song">
                <Image
                  alt="artist's cover"
                  src={artist?.images[0]?.url}
                  width={60}
                  height={60}
                  id={"artist-cover"}
                />
                <div className="song-info">
                  <p>{artist.name}</p>
                </div>
              </div>

              <div className="song-btns">
                <a
                  href="#"
                  className="choose-song btn"
                  onClick={(e) => {
                    e.preventDefault();
                    chooseSong(artist.external_urls.spotify);
                    closeModal();
                  }}
                >
                  Select
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SearchArtists;
