import ReactPlayer from "react-player";
import Image from "next/dist/client/image";
import Icons from "../../posts/icons/WebsiteIcons";
import { toast } from "react-toastify";

const PostForm = ({ publish, changeLoader, openModal }) => {
  function checkInputs(e) {
    e.preventDefault();
    changeLoader("on");
    const song = document.getElementById("song");
    const title = document.getElementById("title");
    const description = document.getElementById("description");

    if (song.value === "") {
      toast.error("Song's URL must be included!");
      changeLoader("off");
      return;
    }

    if (
      !ReactPlayer.canPlay(song.value) &&
      !song.value.toLowerCase().includes("spotify")
    ) {
      toast.error("Sorry, we don't support this link.");
      changeLoader("off");
    } else publish(song.value, title.value, description.value);
  }

  return (
    <form onSubmit={checkInputs}>
      <div className="form-inputs" autoComplete="off">
        <Icons />
        <div className="song-url flex">
          <input type="text" id="song" placeholder="Song's URL" />
          OR
          <button className="search-btn" onClick={openModal}>
            <Image
              src={"/Images/spotify.svg"}
              width={25}
              height={25}
              alt="spotify"
            />
            <p>Search</p>
          </button>
        </div>
        <input type="text" placeholder="Title" id="title" />
        <textarea placeholder="Description" id="description" />
      </div>
      <div className="flex">
        <button className="btn" type="submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
