import { toast } from "react-toastify";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import dateFormat from "dateformat";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Post = ({ details, onDelete, deletable = false }) => {
  const [user, SetUser] = useState({ username: "s", _id: 0 });
  const [likes, SetLikes] = useState(details.likes.length);
  const [hasLiked, SetHasLiked] = useState(false);

  useEffect(() => {
    if (
      details.likes.includes(jwt_decode(localStorage.getItem("token")).userId)
    ) {
      document.getElementsByClassName(details._id)[0].style.fill = "red";
      SetHasLiked(true);
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

  async function likePost(e) {
    e.target.style.fill = "red";

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
        SetLikes(likes + 1);
        SetHasLiked(true);
      }
    }
  }

  async function unlikePost(e) {
    e.target.style.fill = "black";

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
        SetLikes(likes - 1);
        SetHasLiked(false);
      }
    }
  }

  async function deletePost(e) {
    e.preventDefault();
    const option = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    var result = await API(option, `api/posts/${details._id}`);

    if (result.status == 200) {
      toast.success("Post deleted!");
      var token = localStorage.getItem("token");
      const jwt = jwt_decode(token);
      onDelete(jwt);
    }
  }

  const host = "https://alinavidi.ir/";

  return (
    <div className="flex">
      <div className="post">
        {user && (
          <Link href={`/profile/${user.username}/${user._id}`}>
            <a>
              <div className="post-user flex">
                <Image
                  src={host + user.image}
                  alt="user avatar"
                  id="avatar"
                  width={35}
                  height={35}
                />
                <p>{user.username}</p>
              </div>
            </a>
          </Link>
        )}
        <div className="post-image flex">
          <audio controls src={host + details.song}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>

        <p id="post-title">{details.title}</p>
        <p id="post-description">{details.description}</p>
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
                <Image
                  width={32}
                  height={32}
                  src="/Images/comment-svgrepo-com.svg"
                  id="comment-icon"
                />

                <p id="like-count">{details.comments_length}</p>
              </a>
            </Link>
            {deletable && (
              <a onClick={deletePost} href="#">
                <svg version="1.1" id="delete-btn" viewBox="0 0 59 59">
                  <g>
                    <path
                      d="M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289
		C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h46c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M21.792,2.681
		C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681c0.805,0.823,1.128,2.271,1.24,3.319H20.553
		C20.665,4.952,20.988,3.504,21.792,2.681z"
                    />
                    <path
                      d="M10.456,54.021C10.493,55.743,11.565,59,15.364,59h28.272c3.799,0,4.871-3.257,4.907-4.958L50.376,10H8.624L10.456,54.021z
		 M48.291,12l-1.747,41.979C46.538,54.288,46.4,57,43.636,57H15.364c-2.734,0-2.898-2.717-2.909-3.042L10.709,12H48.291z"
                    />
                    <path d="M17.5,54h24c0.552,0,1-0.447,1-1s-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1S16.948,54,17.5,54z" />
                    <path d="M17.5,49h24c0.552,0,1-0.447,1-1s-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1S16.948,49,17.5,49z" />
                    <path d="M17.5,44h24c0.552,0,1-0.447,1-1s-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1S16.948,44,17.5,44z" />
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </a>
            )}
          </div>
          <p id="date">{dateFormat(details.date, "mmm d, yyyy")}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
