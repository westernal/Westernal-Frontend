import { useContext } from "react";
import { createContext } from "react";

export const SearchMusicContext = createContext<any>({});

export const useSearchContext = () => {
  return useContext(SearchMusicContext);
};

export const SearchMusicProvider = ({ children }) => {
  const chooseSong = (url: string) => {
    const song = document.getElementById("song") as HTMLInputElement;
    song.value = url;
  };

  const closeModal = () => {
    const searchModal = document.getElementById(
      "search-modal"
    ) as HTMLDialogElement;
    searchModal.close();
  };

  const openModal = () => {
    const searchModal = document.getElementById(
      "search-modal"
    ) as HTMLDialogElement;
    searchModal.showModal();
  };

  const playSong = (id: string) => {
    const song = document.getElementById(id) as HTMLAudioElement;

    pauseOtherSongs();
    song.play();
  };

  const pauseSong = (id: string) => {
    const song = document.getElementById(id) as HTMLAudioElement;
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
      value={{
        closeModal,
        chooseSong,
        playSong,
        pauseSong,
        pauseOtherSongs,
        openModal,
      }}
    >
      {children}
    </SearchMusicContext.Provider>
  );
};
