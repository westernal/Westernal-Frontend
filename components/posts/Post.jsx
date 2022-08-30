import API from "../../requests/API";
import dateFormat from "dateformat";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import SpotifyPlayer from "react-spotify-player";
import PostError from "./error/PostError";
import PostIcons from "./icons/PostIcons.";

const Post = ({
  details,
  onDelete,
  deletable = false,
  creator,
  isLoggedIn = true,
}) => {
  const [user, SetUser] = useState(creator);
  const [isSpotify, SetIsSpotify] = useState(false);
  const [error, SetError] = useState(false);

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
        <Link href={`/${user && user.username}`}>
          <a>
            {user && (
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
            )}
          </a>
        </Link>

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
            {isSpotify && !error && (
              <SpotifyPlayer
                uri={details.songUrl}
                view="coverart"
                theme="black"
              />
            )}
          </div>
        </div>

        <p id="post-title" dir="auto">
          {details.title}
        </p>
        <p id="post-description" dir="auto">
          {details.description}
        </p>

        <div className="post-info flex">
          {isLoggedIn && (
            <PostIcons
              details={details}
              onDelete={onDelete}
              deletable={deletable}
            />
          )}
          <p id="date">{dateFormat(details.date, "mmm d yyyy, HH:MM")}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
