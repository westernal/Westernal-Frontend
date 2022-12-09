import { useEffect } from "react";
import { useState } from "react";
import SearchTracks from "./Tracks";
import SearchArtists from "./Artists";
import getSpotifyToken from "../../../requests/getSpotifyToken";

const SearchSong = ({ hide, chooseSong }) => {
  const [isArtist, SetIsArtist] = useState(false);
  const [token, SetToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      SetToken(await getSpotifyToken());
    };

    getToken();

    window.onclick = function (event) {
      if (event.target == document.getElementById("delete-modal")) {
        hide();
      }
    };
  }, []);

  const closeModal = (e) => {
    e.preventDefault();
    hide();
  };

  const categoryHandler = (e) => {
    e.preventDefault();
    document.getElementsByClassName("active")[0].classList.remove("active");
    e.target.classList.add("active");
    SetIsArtist(!isArtist);
  };

  return (
    <div className="delete-modal" id="delete-modal">
      <div className="modal-text search-modal">
        <a href="#" onClick={closeModal} className="close">
          &times;
        </a>
        <div className="search-type flex">
          <a href="#" className="active" onClick={categoryHandler}>
            Track
          </a>
          <a href="#" onClick={categoryHandler}>
            Artist
          </a>
        </div>
        {!isArtist && (
          <SearchTracks token={token} chooseSong={chooseSong} hide={hide} />
        )}
        {isArtist && (
          <SearchArtists token={token} chooseSong={chooseSong} hide={hide} />
        )}
      </div>
    </div>
  );
};

export default SearchSong;
