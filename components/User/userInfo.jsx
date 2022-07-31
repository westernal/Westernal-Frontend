import API from "../../requests/API";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import Image from "next/image";

import Link from "next/link";
import Head from "next/head";

const UserInfo = ({ isUserSelf }) => {
  const router = useRouter();

  const [isFollowing, SetIsFollowing] = useState(false);
  const [user, SetUser] = useState({
    posts: [],
    followers: [],
    followings: [],
    bio: "",
    image: "",
  });

  const host = "https://alinavidi.ir/";

  function logOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    router.push("/");
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
    } else {
      toast.error(result.data.message);
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
    } else {
      toast.error(result.data.message);
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
    if (router.query.username) {
      getUserInfo(router.query.id);
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{router.query.username} - Westernal</title>
      </Head>
      <div className="header">
        <div className="flex username">
          <p>{router.query.username}</p>
          {user.verified && (
            <Image
              src="/Images/verified.png"
              alt="verified"
              width={25}
              height={25}
            />
          )}
        </div>
        {isUserSelf && (
          <div className="flex">
            <button onClick={logOut}>Logout</button>

            <Link href={`/profile/${router.query.username}/setting`}>
              <a className="flex">
                <Image
                  src="/Images/settings.png"
                  alt="setting"
                  width={32}
                  height={32}
                />
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="profile-info">
        <div className="flex">
          <div className="profile-pic flex">
            <Image
              src={host + user.image}
              alt="profile picture"
              width={95}
              height={95}
            />
          </div>
        </div>
        <p id="bio">{user.bio}</p>
        <div className="follow-section flex">
          <div className="followers">
            <p>Followers</p>
            <Link href={`/profile/${user.username}/${user._id}/followers`}>
              <a>
                <p className="followers-count flw-num">
                  {user.followers.length}
                </p>
              </a>
            </Link>
          </div>
          <div className="followers">
            <p>Following</p>
            <Link href={`/profile/${user.username}/${user._id}/followings`}>
              <a>
                <p className="flw-num">{user.followings.length}</p>
              </a>
            </Link>
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
    </>
  );
};

export default UserInfo;
