import ReactPlayer from "react-player";
import Image from "next/dist/client/image";
import Icons from "../../posts/icons/WebsiteIcons";
import { toast } from "react-toastify";
import { useState } from "react";

const PostForm = ({ publish, changeLoader, openModal }) => {
  const [captionValue, SetCaptionValue] = useState("");

  function checkInputs(e) {
    e.preventDefault();
    changeLoader("on");
    const song = document.getElementById("song");
    const caption = document.getElementById("caption");

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
    } else publish(song.value, caption.value);
  }

  return (
    <form onSubmit={checkInputs}>
      <section className="form-inputs" autoComplete="off">
        <Icons />
        <div className="song-url flex">
          <input
            type="text"
            id="song"
            placeholder="Song's URL"
            autoComplete={"off"}
          />
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

        <textarea
          placeholder="Caption"
          id="caption"
          value={captionValue}
          onChange={(e) => SetCaptionValue(e.target.value)}
          rows={
            /\n/.test(captionValue)
              ? Number(captionValue.match(/\n/g)?.length) + 1
              : 1
          }
        />
      </section>
      <div className="flex">
        <button className="btn" type="submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
