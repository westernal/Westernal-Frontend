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
  const [link, SetLink] = useState();

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

    if (user.personal_link) {
      let domain = new URL(user.personal_link);
      domain = domain.hostname.replace("www.", "") + domain.pathname;
      SetLink(domain);
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
            <button className="contact-btn">Login</button>
          </Link>
        )}
        {isUserSelf && (
          <div className="flex">
            <Link href={`/${router.query.username}/saved`} className="flex">
              <Image
                src="/Images/save.svg"
                alt="saved posts"
                width={30}
                height={30}
              />
            </Link>

            <Link href={`/${router.query.username}/setting`} className="flex">
              <Image
                src="/Images/setting.svg"
                alt="setting"
                width={40}
                height={40}
              />
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
        {user.bio && (
          <p id="user-bio" dir="auto">
            {user.bio}
          </p>
        )}
        {user.personal_link && (
          <a href={user.personal_link} id="user-link">
            {link}
          </a>
        )}

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
