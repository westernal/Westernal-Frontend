import API from "../../requests/API";
import dateFormat from "dateformat";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import SpotifyPlayer from "react-spotify-player";
import ContentLoader from "react-content-loader";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";

const Post = ({ details, onDelete, deletable = false }) => {
  const [user, SetUser] = useState();
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

    getPostCreator();
  }, [details]);

  const playerError = () => {
    SetError(true);
  };

  const host = "https://alinavidi.ir/";

  return (
    <div className="flex ">
      <div className="post ">
        {!user && (
          <ContentLoader
            speed={2}
            width={"100%"}
            height={"100%"}
            viewBox="0 0 300 350"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="31" cy="31" r="15" />
            <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
            <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
            <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
          </ContentLoader>
        )}
        {user && (
          <>
            <Link href={`/profile/${user.username}/${user._id}`}>
              <a>
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
              </a>
            </Link>

            <div className="flex">
              <div className="post-image flex">
                {error && (
                  <p id="post-error">
                    Sorry, looks like you don{"'"}t have access to this link!
                  </p>
                )}
                {!isSpotify && !error && (
                  <ReactPlayer url={details.songUrl} onError={playerError} />
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
          </>
        )}
        <div className="post-info flex">
          <div className="post-icons flex">
            <LikePost
              id={details._id}
              likesCount={details.likes.length}
              postLikes={details.likes}
            />
            <Link href={`/comments/${details._id}`}>
              <a id="comments" className="flex gap-5">
                <svg viewBox="0 0 24 24">
                  <path d="M12.0867962,18 L6,21.8042476 L6,18 L4,18 C2.8954305,18 2,17.1045695 2,16 L2,4 C2,2.8954305 2.8954305,2 4,2 L20,2 C21.1045695,2 22,2.8954305 22,4 L22,16 C22,17.1045695 21.1045695,18 20,18 L12.0867962,18 Z M8,18.1957524 L11.5132038,16 L20,16 L20,4 L4,4 L4,16 L8,16 L8,18.1957524 Z" />
                </svg>

                <p id="like-count">{details.comments_length}</p>
              </a>
            </Link>
            {deletable && <DeletePost onDelete={onDelete} id={details._id} />}
          </div>
          <p id="date">{dateFormat(details.date, "mmm d yyyy, HH:MM")}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
