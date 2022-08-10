import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import dateFormat from "dateformat";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";
import SpotifyPlayer from "react-spotify-player";
import ContentLoader from "react-content-loader";
import DeletePost from "./DeletePost";

const Post = ({ details, onDelete, deletable = false }) => {
  const [user, SetUser] = useState();
  const [likes, SetLikes] = useState(details.likes.length);
  const [hasLiked, SetHasLiked] = useState(false);
  const [isSpotify, SetIsSpotify] = useState(false);
  const [error, SetError] = useState(false);

  useEffect(() => {
    if (
      details.likes.includes(jwt_decode(localStorage.getItem("token")).userId)
    ) {
      document.getElementsByClassName(details._id)[0].classList.add("liked");
      SetHasLiked(true);
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

  async function likePost(e) {
    e.preventDefault();

    var token = localStorage.getItem("token");

    const userID = jwt_decode(token).userId;

    if (!details.likes.includes(userID) || !hasLiked) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId: userID,
        }),
        redirect: "follow",
      };

      var result = await API(option, `api/posts/like/${details._id}`);

      if (result.status == 200) {
        document.getElementsByClassName(details._id)[0].classList.add("liked");
        SetLikes(likes + 1);
        SetHasLiked(true);
      }
    }
  }

  async function unlikePost(e) {
    e.preventDefault();

    var token = localStorage.getItem("token");

    const userID = jwt_decode(token).userId;

    if (details.likes.includes(userID) || hasLiked) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId: userID,
        }),
        redirect: "follow",
      };

      var result = await API(option, `api/posts/unlike/${details._id}`);

      if (result.status == 200) {
        document
          .getElementsByClassName(details._id)[0]
          .classList.remove("liked");
        SetLikes(likes - 1);
        SetHasLiked(false);
      }
    }
  }

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
                  <p>
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

            <p id="post-title">{details.title}</p>
            <p id="post-description">{details.description}</p>
          </>
        )}
        <div className="post-info flex">
          <div className="post-icons flex">
            <svg
              version="1.1"
              id="like-btn"
              className={details._id}
              viewBox="0 0 32 32"
              onClick={hasLiked ? unlikePost : likePost}
            >
              <path
                d="M21.5,5c-2.116,0-4.093,0.881-5.5,2.406C14.593,5.881,12.616,5,10.5,5C6.364,5,3,8.333,3,12.5
	C3,21.542,16,27,16,27s13-5.458,13-14.5C29,8.333,25.636,5,21.5,5z M16,24.797C13.378,23.521,5,18.938,5,12.5
	C5,9.467,7.467,7,10.5,7c1.55,0,2.982,0.626,4.03,1.762l0.735,0.797h1.47l0.735-0.797C18.518,7.626,19.95,7,21.5,7
	c3.033,0,5.5,2.467,5.5,5.5C27,18.938,18.622,23.521,16,24.797z"
              />
            </svg>

            <Link href={`/likes/${details._id}`}>
              <a>
                <p id="like-count">{likes}</p>
              </a>
            </Link>
            <Link href={`/comments/${details._id}`}>
              <a id="comments" className="flex">
                <svg width="24px" height="24px" viewBox="0 0 24 24">
                  <path d="M12.0867962,18 L6,21.8042476 L6,18 L4,18 C2.8954305,18 2,17.1045695 2,16 L2,4 C2,2.8954305 2.8954305,2 4,2 L20,2 C21.1045695,2 22,2.8954305 22,4 L22,16 C22,17.1045695 21.1045695,18 20,18 L12.0867962,18 Z M8,18.1957524 L11.5132038,16 L20,16 L20,4 L4,4 L4,16 L8,16 L8,18.1957524 Z" />
                </svg>

                <p id="like-count">{details.comments_length}</p>
              </a>
            </Link>
            {deletable && <DeletePost onDelete={onDelete} id={details._id} />}
          </div>
          <p id="date">{dateFormat(details.date, "mmm d, yyyy")}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
