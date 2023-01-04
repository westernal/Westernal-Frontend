import { useState } from "react";
import Image from "next/dist/client/image";
import FormLoader from "../../layout/loader/FormLoader";
import { useSearchContext } from "../../../context/searchMusicContext";

const SearchAlbum = ({ token }) => {
  const [albums, setAlbums] = useState([]);
  const [loader, SetLoader] = useState(false);
  const { closeModal, chooseSong } = useSearchContext();

  const search = async () => {
    const input = document.getElementById("search-input");
    let response;

    if (albums.length == 0) {
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
      }&type=album&limit=10`,
      option
    );

    const data = await response.json();
    const status = response.status;

    if (status == 200) {
      setAlbums(data.albums.items);
      SetLoader(false);
    }
  };

  return (
    <>
      <div className="flex song-search">
        <input
          type="text"
          placeholder="Search an album..."
          id="search-input"
          onChange={search}
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
    </>
  );
};

export default SearchAlbum;
