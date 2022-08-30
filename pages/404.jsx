import Footer from "../components/layout/Footer";
import BackHeader from "../components/layout/header/BackHeader";
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
    <div className="404">
      <Head>
        <title>404 - Westernal</title>
      </Head>
      <BackHeader title={"Error"} />

      <div className="flex">
        <div className="auth-form">
          <Image src={"/Images/logo.png"} width={90} height={90} alt="logo" />
          <h1>404 - Page not found</h1>
          <p>
            Looks like the link you{"'"}re looking for doesn{"'"}t exist!
          </p>
        </div>
      </div>

      {isLoggedIn && <Footer />}
    </div>
  );
};

export default Error;
