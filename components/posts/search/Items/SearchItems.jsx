import Image from "next/image";
import SongButtons from "./SongButtons";

const SearchItems = ({ song, chooseSong, hide }) => {
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

      <SongButtons song={song} chooseSong={chooseSong} hide={hide} />
    </div>
  );
};

export default SearchItems;
