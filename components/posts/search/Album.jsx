import { useState, useEffect, useRef } from "react";
import Image from "next/dist/client/image";
import FormLoader from "../../layout/loader/FormLoader";
import { useSearchContext } from "../../../context/searchMusicContext";

const SearchAlbum = ({ token }) => {
  const [albums, setAlbums] = useState([]);
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

    if (albums.length == 0) {
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
      }&type=album&limit=10`,
      option
    );

    const data = await response.json();
    const status = response.status;

    if (status == 200) {
      setAlbums(data.albums.items);
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
          placeholder="Search an album..."
          id="search-input"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          autoComplete={"off"}
        />
      </div>
      <div className="search-results">
        {loader && <FormLoader />}
        {albums.map((album) => {
          return (
            <div className="profile-notif artist-info" key={album.id}>
              <div className="searched-song">
                <Image
                  alt="artist's cover"
                  src={album.images[0] && album.images[0].url}
                  width={60}
                  height={60}
                  id={"artist-cover"}
                />
                <div className="song-info">
                  <p>{album.name}</p>
                  <p id="artist">
                    {album.artists.map((artist, index, array) =>
                      index == array.length - 1
                        ? artist.name
                        : `${artist.name} feat. `
                    )}
                  </p>
                </div>
              </div>

              <div className="song-btns">
                <a
                  href="#"
                  className="choose-song btn"
                  onClick={(e) => {
                    e.preventDefault();
                    chooseSong(album.external_urls.spotify);
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

export default SearchAlbum;
