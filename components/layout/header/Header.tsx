import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import decodeJWT from "../../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import getRequest from "../../../functions/requests/getRequest";

const Header = ({ showLogo = false, title = "" }) => {
  const [token, SetToken] = useState<any>({ username: "", userId: 0 });
  const { data: result } = useSWR(`api/users/messages/${token.userId}`, (url) =>
    getRequest(url, true)
  );

  useEffect(() => {
    const decodedToken = decodeJWT(getCookie("cookieToken").toString());
    SetToken(decodedToken);
  }, []);
  return (
    <header className="header">
      {showLogo ? (
        <>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              location.reload();
            }}
          >
            <h1 id="website-name">westernal</h1>
          </a>
          <div className="header-icons flex">
            <div className="notification-icon">
              <Link href={"/user/chats"} id="chat-btn">
                <Image
                  src={"/Images/chat.svg"}
                  width={30}
                  height={30}
                  alt="Chat button"
                />
              </Link>
              {result && result.data.messages && result?.data?.messages != 0 ? (
                <div className="new-notif flex">{result?.data?.messages}</div>
              ) : null}
            </div>
            <Link href={"/post/new"} id="add-btn">
              <Image
                src={"/Images/add.svg"}
                width={25}
                height={25}
                alt="add button"
              />
            </Link>
          </div>
        </>
      ) : (
        <h1 className="notification-header">{title}</h1>
      )}
    </header>
  );
};

export default Header;
