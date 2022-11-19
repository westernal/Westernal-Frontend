import { useEffect } from "react";
import { useState } from "react";
import SearchTracks from "./Tracks";
import SearchArtists from "./Artists";
import { toast } from "react-toastify";

const SearchSong = ({ hide, chooseSong }) => {
  const [isArtist, SetIsArtist] = useState(false);
  const [token, SetToken] = useState("");
  const clientToken =
    "355a112f4a27485cbbb614e817d439c8:f12328b921684083802df0f82574a6ee";

  useEffect(() => {
    const getToken = async () => {
      let response;

      const option = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic" + " " + new Buffer(clientToken).toString("base64"),
        },
        body: "grant_type=client_credentials",
        json: true,
      };

      try {
        response = await fetch(
          `https://accounts.spotify.com/api/token`,
          option
        );
      } catch (error) {
        toast.error("Server error, please try again later!");
        return;
      }

      const data = await response.json();

      const status = response.status;

      if (status == 200) {
        SetToken(data.access_token);
      }
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
