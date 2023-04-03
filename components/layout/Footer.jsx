import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import postRequest from "../../functions/requests/postRequest";
import getRequest from "../../functions/requests/getRequest";
import decodeJWT from "../../functions/decodeJWT";
import Cookies from "js-cookie";

const Footer = () => {
  const [notificationCount, SetNotificationCount] = useState(0);
  const [jwt, Setjwt] = useState({ username: "" });

  const getCount = async (userId) => {
    const result = await getRequest(`api/users/notification/${userId}`, true);

    if (result?.status == 200) {
      SetNotificationCount(result.data.notifications);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token").toString();
    const decodedToken = decodeJWT(token);

    Setjwt(decodedToken);
    getCount(decodedToken.userId);
  }, []);

  const clearNotification = async () => {
    SetNotificationCount(0);
    await postRequest({}, `api/users/notification/clear/${jwt.userId}`, true);
  };

  return (
    <footer className="footer">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
      </Head>
      <Link href="/home/timeline">
        <Image
          width={28}
          height={28}
          src="/Images/home.png"
          alt="home"
          id="home-icon"
        />
      </Link>

      <Link href="/user/search">
        <Image
          width={28}
          height={28}
          src="/Images/search.svg"
          alt="search"
          id="search-icon"
        />
      </Link>

      <Link href="/user/notifications" onClick={clearNotification}>
        <div className="notification-icon">
          <Image
            width={25}
            height={25}
            src="/Images/notification.svg"
            alt="notification"
            id="notif-icon"
          />
          {notificationCount != 0 ? (
            <div className="new-notif flex">{notificationCount}</div>
          ) : null}
        </div>
      </Link>

      <Link href={`/${jwt.username}`}>
        <Image
          width={33}
          height={33}
          src="/Images/user.svg"
          alt="profile"
          id="user-icon"
        />
      </Link>
    </footer>
  );
};

export default Footer;
