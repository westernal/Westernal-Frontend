import ReactPlayer from "react-player";
import Image from "next/dist/client/image";
import Icons from "../../posts/icons/WebsiteIcons";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSearchContext } from "../../../context/searchMusicContext";

const PostForm = ({ publish, changeLoader }) => {
  const [captionValue, SetCaptionValue] = useState("");
  const { openModal } = useSearchContext();

  function checkInputs(e: any) {
    e.preventDefault();
    changeLoader("on");
    const song = document.getElementById("song") as HTMLInputElement;
    const caption = document.getElementById("caption") as HTMLInputElement;

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
    <form onSubmit={checkInputs} autoComplete="off">
      <section className="form-inputs">
        <Icons />
        <div className="song-url flex">
          <input type="text" id="song" placeholder="Song's URL" />
          OR
          <button
            className="search-btn"
            onClick={(e: any) => {
              e.preventDefault();
              openModal();
            }}
          >
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
              ? Number(captionValue.match(/\n/g)?.length) + 6
              : 6
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
