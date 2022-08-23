import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import FollowSection from "./followUser/FollowSection";
import Follow from "./followUser/Follow";
import LogOut from "./Logout";
import jwtDecode from "jwt-decode";

const UserInfo = ({ isUserSelf, user }) => {
  const router = useRouter();
  const [isFollowing, SetIsFollowing] = useState(false);
  const host = "https://alinavidi.ir/";

  useEffect(() => {
    const userId = jwtDecode(localStorage.getItem("token")).userId;
    if (!isUserSelf && user.followers.includes(userId)) {
      SetIsFollowing(true);
    }
  }, [user]);

  const changeIsFollowing = (followBoolean) => {
    SetIsFollowing(followBoolean);
  };

  return (
    <>
      <Head>
        <title>@{user.username} - Westernal</title>
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
        {isUserSelf && (
          <div className="flex">
            <a href="mailto:support@westernal.net">
              <button className="contact-btn">Contact Support</button>
            </a>

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
        <p id="user-bio" dir="auto">
          {user.bio}
        </p>

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
