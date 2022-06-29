import API from "../../requests/API";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

const UserInfo = () => {
  const router = useRouter();
  const [isUserSelf, SetIsUserSelf] = useState(false);
  const [isFollowing, SetIsFollowing] = useState(false);
  const [user, SetUser] = useState({
    posts: [],
    followers: [],
    followings: [],
  });

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

  useEffect(() => {
    function checkUser(userName) {
      if (userName === router.query.username) {
        SetIsUserSelf(true);
      }
      if (router.query.username) {
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
  );
};

export default UserInfo;
