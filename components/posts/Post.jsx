import API from "../../requests/API";
import dateFormat from "dateformat";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import SpotifyPlayer from "react-spotify-player";
import DeletePost from "./DeletePost";
import LikePost from "./LikePost";
import PostError from "./PostError";

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
            <div className="post-icons flex">
              <LikePost
                id={details._id}
                likesCount={details.likes.length}
                postLikes={details.likes}
              />
              <Link href={`/comments/${details._id}`}>
                <a id="comments" className="flex gap-5">
                  <svg viewBox="0 0 24 24">
                    <g id="Icons" stroke="none" fill="none">
                      <g
                        id="Rounded"
                        transform="translate(-680.000000, -2060.000000)"
                      >
                        <g
                          id="Editor"
                          transform="translate(100.000000, 1960.000000)"
                        >
                          <g
                            id="-Round-/-Editor-/-mode_comment"
                            transform="translate(578.000000, 98.000000)"
                          >
                            <g transform="translate(0.000000, 0.000000)">
                              <polygon
                                id="Path"
                                points="0 0 24 0 24 24 0 24"
                              ></polygon>
                              <path
                                d="M22,4 C22,2.9 21.1,2 20,2 L4,2 C2.9,2 2,2.9 2,4 L2,16 C2,17.1 2.9,18 4,18 L18,18 L22,22 L22,4 Z"
                                id="🔹-Icon-Color"
                                fill="black"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>

                  <p id="like-count">{details.comments_length}</p>
                </a>
              </Link>
              {deletable && <DeletePost onDelete={onDelete} id={details._id} />}
            </div>
          )}
          <p id="date">{dateFormat(details.date, "mmm d yyyy, HH:MM")}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
