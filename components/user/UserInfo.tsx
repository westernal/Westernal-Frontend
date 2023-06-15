import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import FollowSection from "./followUser/FollowSection";
import UserHeader from "../layout/header/UserHeader";
import FollowDetails from "./followUser/FollowDetails";
import decodeJWT from "../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import { User } from "../../interfaces/interface";
import { HOST } from "../../data/data";

const UserInfo = ({
  isUserSelf,
  user,
  isLoggedIn,
}: {
  isUserSelf: boolean;
  user: User;
  isLoggedIn: boolean;
}) => {
  const [isFollowing, SetIsFollowing] = useState<boolean>(false);
  const [link, SetLink] = useState<URL | string>();

  useEffect(() => {
    if (isLoggedIn) {
      const userId = decodeJWT(getCookie("cookieToken").toString()).userId;

      if (!isUserSelf && user?.followers.includes(userId)) {
        SetIsFollowing(true);
      }
    }

    if (user?.personal_link || user?.personal_link != " ") {
      let domain: URL | string;
      try {
        domain = new URL(user?.personal_link);
      } catch (error) {
        return;
      }
      domain = domain.hostname.replace("www.", "") + domain.pathname;
      SetLink(domain);
    }
  }, [user, isLoggedIn]);

  const changeIsFollowing = (followBoolean) => {
    SetIsFollowing(followBoolean);
  };

  return (
    <>
      <Head>
        <title key="title">Westernal - @{user?.username} </title>
      </Head>

      <UserHeader
        username={user?.username}
        isVerified={user?.verified}
        isLoggedIn={isLoggedIn}
        isUserSelf={isUserSelf}
      />

      <section className="profile-info">
        <div className="flex">
          <div className="profile-pic flex">
            <Image
              src={HOST + user?.image}
              alt="profile picture"
              width={95}
              height={95}
            />
          </div>
        </div>
        {user?.bio ? (
          <strong id="user-bio" dir="auto">
            {user?.bio}
          </strong>
        ) : null}
        {user?.personal_link ? (
          <div className="user-link">
            <a href={user?.personal_link} id="user-link">
              <>{link}</>
            </a>
          </div>
        ) : null}

        <FollowDetails user={user} />

        {!isUserSelf && isLoggedIn ? (
          <FollowSection
            isFollowing={isFollowing}
            SetIsFollowing={changeIsFollowing}
          />
        ) : null}
      </section>
    </>
  );
};

export default UserInfo;
