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
import jwtDecode from "jwt-decode";

const Post = ({ post, onDelete, isLoggedIn = true, onUnsave }) => {
  const [isSpotify, SetIsSpotify] = useState(false);
  const [error, SetError] = useState(false);
  const [canDelete, SetCanDelete] = useState(false);

  useEffect(() => {
    if (post.songUrl) {
      if (post.songUrl.toLowerCase().includes("spotify")) {
        SetIsSpotify(true);
      }
    }

    if (
      post.author.username === jwtDecode(localStorage.getItem("token")).username
    ) {
      SetCanDelete(true);
    }
  }, [post]);

  const playerError = () => {
    SetError(true);
  };

  const host = "https://alinavidi.ir/";

  return (
    <article className="post" id={`post${post._id}`}>
      <section className="post-header flex">
        <Link href={`/${post.author.username}`}>
          <div className="post-user flex">
            <Image
              src={
                !post.author.image.includes("userIcon")
                  ? host + post.author.image
                  : "/Images/user.svg"
              }
              alt="user avatar"
              id="avatar"
              width={40}
              height={40}
            />
            <p>{post.author.username}</p>
            {post.author.verified && (
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
          id={post._id}
          isLoggedIn={isLoggedIn}
          onUnsave={onUnsave}
        />
      </section>

      <section className="post-song flex">
        {error && <PostError />}
        {!isSpotify && !error && (
          <ReactPlayer
            url={post.songUrl}
            onError={playerError}
            controls={true}
            pip={true}
          />
        )}
        {isSpotify && !error && <SpotifyPlayer url={post.songUrl} />}
      </section>

      <section className="post-caption">
        {post.caption && (
          <p id="post-caption" dir="auto">
            {post.caption}
          </p>
        )}
      </section>

      <section className="post-info flex">
        {isLoggedIn && <PostIcons post={post} />}
        <p id="date">{formatDate(post.date)}</p>
      </section>
    </article>
  );
};

export default Post;
