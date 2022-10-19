import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import FollowSection from "./followUser/FollowSection";
import Follow from "./followUser/Follow";
import jwtDecode from "jwt-decode";

const UserInfo = ({ isUserSelf, user, isLoggedIn }) => {
  const router = useRouter();
  const [isFollowing, SetIsFollowing] = useState(false);
  const [avatar, SetAvatar] = useState("");
  const host = "https://alinavidi.ir/";

  useEffect(() => {
    if (user.image.includes("userIcon")) {
      SetAvatar("/Images/user.svg");
    } else SetAvatar(host + user.image);

    if (isLoggedIn) {
      const userId = jwtDecode(localStorage.getItem("token")).userId;
      if (!isUserSelf && user.followers.includes(userId)) {
        SetIsFollowing(true);
      }
    }
  }, [user]);

  const changeIsFollowing = (followBoolean) => {
    SetIsFollowing(followBoolean);
  };

  return (
    <>
      <Head>
        <title key="title">Westernal - @{user.username} </title>
      </Head>
      <div className="header">
        <div className="flex username">
          <p>{user.username}</p>
          {user.verified && (
            <Image
              src="/Images/verified.png"
              alt="verified"
              width={25}
              height={25}
            />
          )}
        </div>
        {!isLoggedIn && (
          <Link href="/">
            <a>
              <button className="contact-btn">Login</button>
            </a>
          </Link>
        )}
        {isUserSelf && (
          <div className="flex">
            <Link href={`/${router.query.username}/saved`}>
              <a className="flex">
                <Image
                  src="/Images/save.svg"
                  alt="saved posts"
                  width={30}
                  height={30}
                />
              </a>
            </Link>

            <Link href={`/${router.query.username}/setting`}>
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
            <Image src={avatar} alt="profile picture" width={95} height={95} />
          </div>
        </div>
        <p id="user-bio" dir="auto">
          {user.bio}
        </p>

        <FollowSection user={user} />

        {!isUserSelf && isLoggedIn && (
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
