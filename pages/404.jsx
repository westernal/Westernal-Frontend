import Footer from "../components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";

const Error = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      SetIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="error-page">
      <Head>
        <title>404 - Westernal</title>
      </Head>

      <div className="flex">
        <div className="auth-form">
          <Image src={"/Images/logo.png"} width={90} height={90} alt="logo" />
          <h1>404 - Page not found</h1>
          <p>
            Looks like the link you{"'"}re looking for doesn{"'"}t exist!
          </p>
          <Link href="/">
            <button className="contact-btn">Go to home page</button>
          </Link>
        </div>
      </div>

      {isLoggedIn ? <Footer /> : null}
    </div>
  );
};

export default Error;
