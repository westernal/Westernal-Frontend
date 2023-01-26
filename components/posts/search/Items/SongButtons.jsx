import { useState } from "react";
import Image from "next/image";
import { useSearchContext } from "../../../../context/searchMusicContext";

const SongButtons = ({ song }) => {
  const [isPlaying, SetIsPlaying] = useState(false);
  const { closeModal, chooseSong, playSong, pauseSong } = useSearchContext();

  const pauseButtonClicked = (e) => {
    e.preventDefault();
    pauseSong(song.id);
    SetIsPlaying(false);
  };

  const playButtonClicked = (e) => {
    e.preventDefault();
    playSong(song.id);
    SetIsPlaying(true);
  };

  const selectButtonClicked = (e) => {
    e.preventDefault();
    pauseSong(song.id);
    chooseSong(song.external_urls.spotify);
    closeModal();
  };

  return (
    <section className="song-btns">
      {!isPlaying ? (
        <a href="#" onClick={playButtonClicked} style={{ height: "25px" }}>
          <Image
            src={"/Images/Play button.svg"}
            alt={"Play Button"}
            width={22}
            height={25}
          />
        </a>
      ) : (
        <a href="#" onClick={pauseButtonClicked} style={{ height: "25px" }}>
          <Image
            src={"/Images/Pause Button.svg"}
            alt={"Pause Button"}
            width={20}
            height={25}
            id="pause-btn"
          />
        </a>
      )}
      <a href="#" className="choose-song btn" onClick={selectButtonClicked}>
        Select
      </a>
      <div className="song-preview">
        <audio
          src={song.preview_url}
          id={song.id}
          className="audio-player"
          onEnded={() => {
            SetIsPlaying(false);
          }}
          onPause={() => {
            SetIsPlaying(false);
          }}
        ></audio>
      </div>
    </section>
  );
};

export default SongButtons;
