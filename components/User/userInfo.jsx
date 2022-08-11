import API from "../../requests/API";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import FollowSection from "./FollowUser/FollowSection";
import Follow from "./FollowUser/Follow";

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

  const changeIsFollowing = (followBoolean) => {
    SetIsFollowing(followBoolean);
  };

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
                  src="/Images/setting.svg"
                  alt="setting"
                  width={40}
                  height={40}
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
              src={
                !user.image.includes("userIcon")
                  ? host + user.image
                  : "/Images/user.svg"
              }
              alt="profile picture"
              width={95}
              height={95}
            />
          </div>
        </div>
        <p id="user-bio">{user.bio}</p>

        <FollowSection user={user} />

        {!isUserSelf && (
          <Follow
            isFollowing={isFollowing}
            SetIsFollowing={changeIsFollowing}
          />
        )}
      </div>
    </>
  );
};

export default UserInfo;
