import Image from "next/image";
import { useState } from "react";

const SearchItems = ({ song, chooseSong, hide }) => {
  const [isPlaying, SetIsPlaying] = useState(false);

  return (
    <div className="profile-notif ">
      <div className="searched-song">
        <div className="song-cover">
          <Image
            alt="song's cover"
            src={song.album.images[0].url}
            width={60}
            height={60}
            id={"song-cover"}
          />
        </div>
        <div className="song-info">
          <p>{song.name}</p>
          <p id="artist">
            {song.artists.map((artist, index, array) =>
              index == array.length - 1 ? artist.name : `${artist.name} feat. `
            )}
          </p>
        </div>
      </div>
      <div className="song-btns">
        {!isPlaying ? (
          <Image
            src={"/Images/Play button.svg"}
            alt={"Play Button"}
            width={27}
            height={30}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(song.id).play();
              SetIsPlaying(true);
            }}
          />
        ) : (
          <Image
            src={"/Images/Pause button.svg"}
            alt={"Pause Button"}
            width={25}
            height={30}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(song.id).pause();
              SetIsPlaying(false);
            }}
          />
        )}
        <a
          href="#"
          className="choose-song btn"
          onClick={(e) => {
            e.preventDefault();
            chooseSong(song.external_urls.spotify);
            hide();
          }}
        >
          Select
        </a>
      </div>

      <div className="song-preview">
        <audio src={song.preview_url} id={song.id}></audio>
      </div>
    </div>
  );
};

export default SearchItems;
