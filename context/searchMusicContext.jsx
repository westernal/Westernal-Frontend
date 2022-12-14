import { useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";

export const SearchMusicContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchMusicContext);
};

export const SearchMusicProvider = ({ children }) => {
  var searchModal;

  useEffect(() => {
    searchModal = document.getElementById("delete-modal");
  }, []);

  const chooseSong = (url) => {
    const song = document.getElementById("song");
    song.value = url;
  };

  const closeModal = () => {
    searchModal.style.height = "0";
  };

  return (
    <SearchMusicContext.Provider value={{ closeModal, chooseSong }}>
      {children}
    </SearchMusicContext.Provider>
  );
};
