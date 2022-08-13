import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import API from "../../requests/API";
import Link from "next/link";

const LikePost = ({ id, likesCount, postLikes }) => {
  const [likes, SetLikes] = useState(likesCount);
  const [hasLiked, SetHasLiked] = useState(false);

  useEffect(() => {
    if (postLikes.includes(jwt_decode(localStorage.getItem("token")).userId)) {
      document.getElementsByClassName(id)[0].classList.add("liked");
      SetHasLiked(true);
    }
  }, []);

  async function likePost(e) {
    e.preventDefault();

    var token = localStorage.getItem("token");

    const userID = jwt_decode(token).userId;

    if (!postLikes.includes(userID) || !hasLiked) {
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

      var result = await API(option, `api/posts/like/${id}`);

      if (result.status == 200) {
        document.getElementsByClassName(id)[0].classList.add("liked");
        SetLikes(likes + 1);
        SetHasLiked(true);
      }
    }
  }

  async function unlikePost(e) {
    e.preventDefault();

    var token = localStorage.getItem("token");

    const userID = jwt_decode(token).userId;

    if (postLikes.includes(userID) || hasLiked) {
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

      var result = await API(option, `api/posts/unlike/${id}`);

      if (result.status == 200) {
        document.getElementsByClassName(id)[0].classList.remove("liked");
        SetLikes(likes - 1);
        SetHasLiked(false);
      }
    }
  }

  return (
    <div className="flex gap-5">
      <svg
        version="1.1"
        id="like-btn"
        className={id}
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
      <Link href={`/likes/${id}`}>
        <a>
          <p id="like-count">{likes}</p>
        </a>
      </Link>
    </div>
  );
};

export default LikePost;
