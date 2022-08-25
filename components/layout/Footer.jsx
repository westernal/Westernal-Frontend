import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import getNewNotification from "../../requests/getNewNotifications";
import API from "../../requests/API";

const Footer = () => {
  const router = useRouter();
  const [notificationCount, SetNotificationCount] = useState(0);
  const [repeat, SetRepeat] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const repeatFunction = () => {
    SetRepeat(!repeat);
  };

  useEffect(() => {
    const getCount = async () => {
      let count = await getNewNotification();
      SetNotificationCount(count);
      await sleep(60000);
      repeatFunction();
    };

    getCount();
  }, [repeatFunction]);

  function generateToken(e) {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const jwt = jwt_decode(token);
    router.push(`/${jwt.username}`);
  }

  const clearNotification = async () => {
    const option = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(
      option,
      `api/users/notification/clear/${
        jwt_decode(localStorage.getItem("token")).userId
      }`
    );

    SetNotificationCount(0);
  };

  return (
    <div className="footer">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
      </Head>
      <Link href="/home">
        <a aria-label="home">
          <Image
            width={28}
            height={28}
            src="/Images/home.png"
            alt="home"
            id="home-icon"
          />
        </a>
      </Link>

      <Link href="/search">
        <a aria-label="search">
          <Image
            width={28}
            height={28}
            src="/Images/search.svg"
            alt="search"
            id="search-icon"
          />
        </a>
      </Link>

      <Link href="/notifications">
        <a aria-label="notification" onClick={clearNotification}>
          <div className="notification-icon">
            <Image
              width={25}
              height={25}
              src="/Images/notification.svg"
              alt="notification"
              id="notif-icon"
            />
            {notificationCount != 0 && (
              <div className="new-notif flex">{notificationCount}</div>
            )}
          </div>
        </a>
      </Link>

      <a aria-label="profile" href="#" onClick={generateToken}>
        <Image
          width={33}
          height={33}
          src="/Images/user.svg"
          alt="profile"
          id="user-icon"
        />
      </a>
    </div>
  );
};

export default Footer;
