import { useEffect } from "react";
import { useState } from "react";
import SearchTracks from "./Tracks";
import SearchArtists from "./Artists";
import getSpotifyToken from "../../../functions/requests/getSpotifyToken";
import { useSearchContext } from "../../../context/searchMusicContext";
import SearchAlbum from "./Album";

const SearchSong = () => {
  const [category, SetCategory] = useState("Track");
  const [token, SetToken] = useState("");
  const { closeModal, pauseOtherSongs } = useSearchContext();

  useEffect(() => {
    const getToken = async () => {
      SetToken(await getSpotifyToken());
    };

    getToken();

    window.onclick = function (event) {
      if (event.target == document.getElementById("delete-modal")) {
        modalFunctions.closeModal();
      }
    };
  }, []);

  const categoryHandler = (e) => {
    e.preventDefault();
    document.getElementsByClassName("active")[0].classList.remove("active");
    e.target.classList.add("active");
    SetCategory(e.target.innerText);
  };

  return (
    <section className="delete-modal" id="delete-modal">
      <div className="modal-text search-modal">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            closeModal();
            pauseOtherSongs();
          }}
          className="close"
        >
          &times;
        </a>
        <div className="search-type flex">
          <a href="#" className="active" onClick={categoryHandler}>
            Track
          </a>
          <a href="#" onClick={categoryHandler}>
            Album
          </a>
          <a href="#" onClick={categoryHandler}>
            Artist
          </a>
        </div>
        {category == "Track" ? (
          <SearchTracks token={token} />
        ) : category == "Artist" ? (
          <SearchArtists token={token} />
        ) : category == "Album" ? (
          <SearchAlbum token={token} />
        ) : null}
      </div>
    </section>
  );
};

export default SearchSong;
