import { useState } from "react";
import Image from "next/image";

const SongButtons = ({ song, chooseSong, hide }) => {
  const [isPlaying, SetIsPlaying] = useState(false);

  return (
    <div className="song-btns">
      {!isPlaying ? (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(song.id).play();
            SetIsPlaying(true);
          }}
          style={{ height: "25px" }}
        >
          <Image
            src={"/Images/Play button.svg"}
            alt={"Play Button"}
            width={22}
            height={25}
          />
        </a>
      ) : (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(song.id).pause();
            SetIsPlaying(false);
          }}
          style={{ height: "25px" }}
        >
          <Image
            src={"/Images/Pause Button.svg"}
            alt={"Pause Button"}
            width={20}
            height={25}
            id="pause-btn"
          />
        </a>
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
      <div className="song-preview">
        <audio
          src={song.preview_url}
          id={song.id}
          onEnded={() => {
            SetIsPlaying(false);
          }}
        ></audio>
      </div>
    </div>
  );
};

export default SongButtons;
