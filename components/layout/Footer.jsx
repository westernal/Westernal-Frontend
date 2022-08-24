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
    router.push(`/${jwt.username}`);
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
        <a aria-label="notification">
          <Image
            width={25}
            height={25}
            src="/Images/notification.svg"
            alt="notification"
            id="notif-icon"
          />
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
