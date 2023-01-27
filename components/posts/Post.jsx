import API from "../../requests/API";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import SpotifyPlayer from "../player/SpotifyPlayer";
import PostError from "./error/PostError";
import PostIcons from "./icons/PostIcons";
import PostOptions from "./options/PostOptions";
import formatDate from "../../Functions/formatDate";

const Post = ({
  details,
  onDelete,
  deletable = false,
  isLoggedIn = true,
  onUnsave,
}) => {
  const [isSpotify, SetIsSpotify] = useState(false);
  const [error, SetError] = useState(false);
  const [canDelete, SetCanDelete] = useState(deletable);

  useEffect(() => {
    if (details.songUrl) {
      if (details.songUrl.toLowerCase().includes("spotify")) {
        SetIsSpotify(true);
      }
    }
  }, [details]);

  const playerError = () => {
    SetError(true);
  };

  const host = "https://alinavidi.ir/";

  return (
    <div className="post" id={`post${details._id}`}>
      <div className="post-header flex">
        <Link href={`/${details.author.username}`}>
          <div className="post-user flex">
            <Image
              src={
                !details.author.image.includes("userIcon")
                  ? host + details.author.image
                  : "/Images/user.svg"
              }
              alt="user avatar"
              id="avatar"
              width={40}
              height={40}
            />
            <p>{details.author.username}</p>
            {details.author.verified && (
              <div className="verify">
                <Image
                  src="/Images/verified (2).png"
                  alt="verify"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        </Link>
        <PostOptions
          onDelete={onDelete}
          deletable={canDelete}
          id={details._id}
          isLoggedIn={isLoggedIn}
          onUnsave={onUnsave}
        />
      </div>

      <div className="post-song flex">
        {error && <PostError />}
        {!isSpotify && !error && (
          <ReactPlayer
            url={details.songUrl}
            onError={playerError}
            controls={true}
            pip={true}
          />
        )}
        {isSpotify && !error && <SpotifyPlayer url={details.songUrl} />}
      </div>

      {details.title && (
        <strong id="post-title" dir="auto">
          {details.title}
        </strong>
      )}
      {details.description && (
        <p id="post-description" dir="auto">
          {details.description}
        </p>
      )}

      <div className="post-info flex">
        {isLoggedIn && <PostIcons details={details} />}
        <p id="date">{formatDate(details.date)}</p>
      </div>
    </div>
  );
};

export default Post;
