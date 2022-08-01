import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  function generateToken(e) {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const jwt = jwt_decode(token);
    router.push(`/profile/${jwt.username}/${jwt.userId}`);
  }

  return (
    <div className="footer">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta name="description" content="Let the songs talk" />
        <meta name="keywords" content="Westernal social media songs music" />
      </Head>
      <Link href="/home">
        <a aria-label="home">
          <Image
            width={32}
            height={32}
            src="/Images/home.png"
            alt="home"
            id="home-icon"
          />
        </a>
      </Link>

      <Link href="/search">
        <a aria-label="search">
          <Image
            width={37}
            height={37}
            src="/Images/magnifierIcon.png"
            alt="search"
            id="search-icon"
          />
        </a>
      </Link>

      <Link href="/notifications">
        <a aria-label="notification">
          <Image
            width={32}
            height={32}
            src="/Images/notification.svg"
            alt="notification"
            id="notif-icon"
          />
        </a>
      </Link>

      <a aria-label="profile" href="#" onClick={generateToken}>
        <Image
          width={32}
          height={32}
          src="/Images/user.svg"
          alt="profile"
          id="user-icon"
        />
      </a>
    </div>
  );
};

export default Footer;
