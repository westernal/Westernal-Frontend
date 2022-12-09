import API from "../../requests/API";
import dateFormat from "dateformat";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import SpotifyPlayer from "../player/SpotifyPlayer";
import PostError from "./error/PostError";
import PostIcons from "./icons/PostIcons";
import jwtDecode from "jwt-decode";
import PostOptions from "./options/PostOptions";

const Post = ({
  details,
  onDelete,
  deletable = false,
  creator,
  isLoggedIn = true,
  onUnsave,
}) => {
  const [user, SetUser] = useState(creator);
  const [isSpotify, SetIsSpotify] = useState(false);
  const [error, SetError] = useState(false);
  const [canDelete, SetCanDelete] = useState(deletable);

  useEffect(() => {
    if (details.songUrl) {
      if (details.songUrl.toLowerCase().includes("spotify")) {
        SetIsSpotify(true);
      }
    }

    async function getPostCreator() {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      var result = await API(option, `api/users/${details.creator}`);

      if (result.status == 200) {
        SetUser(result.data.user);
      }

      if (isLoggedIn) {
        if (
          result.data.user._id ===
          jwtDecode(localStorage.getItem("token")).userId
        ) {
          SetCanDelete(true);
        }
      }
    }

    if (!creator) {
      getPostCreator();
    }
  }, [details]);

  const playerError = () => {
    SetError(true);
  };

  const host = "https://alinavidi.ir/";

  return (
    <div className="flex ">
      <div className="post ">
        {user && (
          <div className="post-header flex">
            <Link href={`/${user && user.username}`}>
              <div className="post-user flex">
                <Image
                  src={
                    !user.image.includes("userIcon")
                      ? host + user.image
                      : "/Images/user.svg"
                  }
                  alt="user avatar"
                  id="avatar"
                  width={40}
                  height={40}
                />
                <p>{user.username}</p>
                {user.verified && (
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
        )}

        <div className="flex">
          <div className="post-image flex">
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
        </div>

        <p id="post-title" dir="auto">
          {details.title}
        </p>
        <p id="post-description" dir="auto">
          {details.description}
        </p>

        <div className="post-info flex">
          {isLoggedIn && <PostIcons details={details} />}
          <p id="date">{dateFormat(details.date, "mmm d yyyy, HH:MM")}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
