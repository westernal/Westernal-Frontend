import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import FollowSection from "./followUser/FollowSection";
import jwtDecode from "jwt-decode";
import UserHeader from "../layout/header/UserHeader";
import FollowDetails from "./followUser/FollowDetails";

const UserInfo = ({ isUserSelf, user, isLoggedIn }) => {
  const [isFollowing, SetIsFollowing] = useState(false);
  const [avatar, SetAvatar] = useState("/Images/user.svg");
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

    if (user.personal_link || user.personal_link != " ") {
      let domain;
      try {
        domain = new URL(user.personal_link);
      } catch (error) {
        return;
      }
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

      <UserHeader
        username={user.username}
        isVerified={user.verified}
        isLoggedIn={isLoggedIn}
        isUserSelf={isUserSelf}
      />

      <section className="profile-info">
        <div className="flex">
          <div className="profile-pic flex">
            <Image src={avatar} alt="profile picture" width={95} height={95} />
          </div>
        </div>
        {user.bio && (
          <strong id="user-bio" dir="auto">
            {user.bio}
          </strong>
        )}
        {user.personal_link && (
          <div className="user-link">
            <a href={user.personal_link} id="user-link">
              {link}
            </a>
          </div>
        )}

        <FollowDetails user={user} />

        {!isUserSelf && isLoggedIn && (
          <FollowSection
            isFollowing={isFollowing}
            SetIsFollowing={changeIsFollowing}
          />
        )}
      </section>
    </>
  );
};

export default UserInfo;
