import { useState } from "react";
import Image from "next/image";
import FormLoader from "../../layout/loader/FormLoader";
import { useSearchContext } from "../../../context/searchMusicContext";
import useSearchSongs from "../../../hooks/useSearchSongs";

const SearchAlbum = ({ token }: { token: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { closeModal, chooseSong } = useSearchContext();
  const { loader, data } = useSearchSongs(searchTerm, "album", token);

  return (
    <section>
      <div className="flex song-search">
        <input
          type="search"
          placeholder="Search an album..."
          id="search-input"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          autoComplete={"off"}
        />
      </div>
      <section className="search-results">
        {loader ? <FormLoader /> : null}
        {data?.albums?.items.map((album) => {
          return (
            <div className="profile-notif artist-info" key={album.id}>
              <div className="searched-song">
                <Image
                  alt="artist's cover"
                  src={album?.images[0]?.url}
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
      </section>
    </section>
  );
};

export default SearchAlbum;
