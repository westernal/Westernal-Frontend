import Footer from "../components/layout/Footer";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const Error = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      SetIsLoggedIn(true);
    }
  }, []);

  const checkNetwork = (e) => {
    e.preventDefault();
    location.reload();
  };

  return (
    <div className="error-page">
      <Head>
        <title>No internet - Westernal</title>
      </Head>

      <div className="flex">
        <div className="auth-form">
          <Image src={"/Images/logo.png"} width={90} height={90} alt="logo" />
          <h1>Network Error</h1>
          <p>Please check your internet connection!</p>
          <button className="contact-btn" onClick={checkNetwork}>
            Check again
          </button>
        </div>
      </div>

      {isLoggedIn && <Footer />}
    </div>
  );
};

export default Error;
