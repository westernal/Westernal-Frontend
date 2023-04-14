import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import postRequest from "../../functions/requests/postRequest";
import getRequest from "../../functions/requests/getRequest";
import decodeJWT from "../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Footer = ({ classnames = "footer" }) => {
  const [token, SetToken] = useState<any>({ username: "", userId: 0 });
  const { data: result } = useSWR(
    `api/users/notification/${token.userId}`,
    (url) => getRequest(url, true)
  );

  useEffect(() => {
    const decodedToken = decodeJWT(getCookie("cookieToken").toString());
    SetToken(decodedToken);
  }, []);

  const clearNotification = async () => {
    await postRequest({}, `api/users/notification/clear/${token.userId}`, true);
  };

  return (
    <footer className={classnames}>
      <Link href="/home/timeline">
        <Image
          width={32}
          height={32}
          src="/Images/home.svg"
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
          {result &&
          result.data.notifications &&
          result?.data?.notifications != 0 ? (
            <div className="new-notif flex">{result?.data?.notifications}</div>
          ) : null}
        </div>
      </Link>

      <Link href={`/${token.username}`}>
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
