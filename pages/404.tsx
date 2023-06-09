import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const Error = () => {
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
    </div>
  );
};

export default Error;
