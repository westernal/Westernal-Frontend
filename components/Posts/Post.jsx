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
  const [bgColor, SetBgColor] = useState("#f3f3f3");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      SetBgColor("#5f5d5d");
    }

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
            viewBox="0 0 320 420"
            backgroundColor={bgColor}
            foregroundColor="#ecebeb"
          >
            <circle cx="25" cy="29" r="11" />
            <rect x="45" y="25" rx="2" ry="2" width="100" height="10" />
            <rect x="0" y="54" rx="2" ry="2" width="320" height="276" />
            <rect x="12" y="345" rx="0" ry="0" width="90" height="12" />
            <rect x="12" y="365" rx="0" ry="0" width="130" height="10" />
            <circle cx="20" cy="405" r="9" />
            <rect x="40" y="397" rx="0" ry="0" width="17" height="17" />
            <rect x="215" y="400" rx="0" ry="0" width="90" height="12" />
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
                {deletable && (
                  <DeletePost onDelete={onDelete} id={details._id} />
                )}
              </div>
              <p id="date">{dateFormat(details.date, "mmm d yyyy, HH:MM")}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
