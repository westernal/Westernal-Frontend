import { useState } from "react";
import Image from "next/dist/client/image";
import FormLoader from "../../layout/loader/FormLoader";
import { useSearchContext } from "../../../context/searchMusicContext";
import useSearchSongs from "../../../hooks/useSearchSongs";

const SearchArtists = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { closeModal, chooseSong } = useSearchContext();
  const [loader, data] = useSearchSongs(searchTerm, "artist", token);

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
      <section className="search-results">
        {loader ? <FormLoader /> : null}
        {data?.artists?.items.map((artist) => {
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
      </section>
    </section>
  );
};

export default SearchArtists;
