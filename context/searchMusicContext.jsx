import { useContext } from "react";
import { createContext } from "react";

export const SearchMusicContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchMusicContext);
};

export const SearchMusicProvider = ({ children }) => {
  const chooseSong = (url) => {
    const song = document.getElementById("song");
    song.value = url;
  };

  const closeModal = () => {
    const searchModal = document.getElementById("delete-modal");
    searchModal.style.height = "0";
  };

  const playSong = (id) => {
    const song = document.getElementById(id);

    pauseOtherSongs();
    song.play();
  };

  const pauseSong = (id) => {
    const song = document.getElementById(id);
    song.pause();
  };

  const pauseOtherSongs = () => {
    const songs = document.querySelectorAll(".audio-player");
    songs.forEach((song) => {
      pauseSong(song.id);
    });
  };

  return (
    <SearchMusicContext.Provider
      value={{ closeModal, chooseSong, playSong, pauseSong, pauseOtherSongs }}
    >
      {children}
    </SearchMusicContext.Provider>
  );
};
