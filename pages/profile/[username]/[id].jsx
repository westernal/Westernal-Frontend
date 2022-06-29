import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../../components/layout/Footer";
import Post from "../../../components/Posts/Post";
import jwt_decode from "jwt-decode";
import API from "../../../requests/API";
import { toast } from "react-toastify";

const Profile = () => {
  const router = useRouter();
  const [user, SetUser] = useState({
    posts: [],
    followers: [],
    followings: [],
  });
  const [isUserSelf, SetIsUserSelf] = useState(false);
  const [isFollowing, SetIsFollowing] = useState(false);
  const [posts, SetPosts] = useState([
    {
      title: "",
      description: "",
      image: "",
      creator: "",
      date: "",
      _id: 0,
      likes: [],
    },
  ]);

  async function getUserPosts(id) {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/posts/user/${router.query.id}`);

    if (result.status == 200) {
      SetPosts(result.data.posts);
    }
  }

  async function getUserInfo(id) {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/users/${id}`);

    if (result.status == 200) {
      SetUser(result.data.user);
      if (
        result.data.user.followers.includes(
          jwt_decode(localStorage.getItem("token")).userId
        )
      ) {
        SetIsFollowing(true);
      }
    }
  }

  async function followUser() {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: router.query.username,
      }),
      redirect: "follow",
    };

    var result = await API(
      option,
      `api/users/follow/${jwt_decode(localStorage.getItem("token")).userId}`
    );

    if (result.status == 200) {
      toast.success(`You started following ${router.query.username}`);
      SetIsFollowing(true);
      document.getElementsByClassName("followers-count")[0].innerHTML =
        parseInt(
          document.getElementsByClassName("followers-count")[0].innerHTML
        ) + 1;
    }
  }

  async function unfollowUser() {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: router.query.username,
      }),
      redirect: "follow",
    };

    var result = await API(
      option,
      `api/users/unfollow/${jwt_decode(localStorage.getItem("token")).userId}`
    );

    if (result.status == 200) {
      toast.success(`You unfollowed ${router.query.username}`);
      SetIsFollowing(false);
      document.getElementsByClassName("followers-count")[0].innerHTML =
        document.getElementsByClassName("followers-count")[0].innerHTML - 1;
    }
  }

  useEffect(() => {
    function checkUser(userName) {
      if (userName === router.query.username) {
        SetIsUserSelf(true);
      }
      if (router.query.username) {
        getUserPosts(router.query.id);
        getUserInfo(router.query.id);
      }
    }

    function getToken() {
      var token = localStorage.getItem("token");
      const jwt = jwt_decode(token);

      checkUser(jwt.username);
    }

    getToken();
  }, [router.query]);

  return (
    <div className="profile">
      <div className="header">
        <p>{router.query.username}</p>
        <Image
          src="/Images/settings.png"
          alt="setting"
          width={32}
          height={32}
        />
      </div>

      <div className="profile-info">
        <div className="flex">
          <div className="profile-pic flex">
            <img
              src="/Images/userIcon.png"
              alt="profile picture"
              width={32}
              height={32}
            />
          </div>
        </div>
        <p id="bio">Founder of Westernal</p>
        <div className="follow-section flex">
          <div className="followers">
            <p>Followers</p>
            <p id="flw-num " className="followers-count">
              {user.followers.length}
            </p>
          </div>
          <div className="followers">
            <p>Following</p>
            <p id="flw-num">{user.followings.length}</p>
          </div>
        </div>
        {!isUserSelf && (
          <div className="flex">
            <button
              className="follow-btn"
              onClick={!isFollowing ? followUser : unfollowUser}
            >
              {!isFollowing ? <p>Follow</p> : <p>Unfollow</p>}
            </button>
          </div>
        )}
      </div>

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <Post details={post} deletable={true} onDelete={getUserPosts} />
          </div>
        );
      })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Profile;
