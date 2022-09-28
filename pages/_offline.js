import Footer from "../components/layout/Footer";
import Link from "next/link";
import Head from "next/head";

const Error = () => {
  return (
    <div className="error-page">
      <Head>
        <title>No internet - Westernal</title>
      </Head>

      <div className="flex">
        <div className="auth-form">
          <h1>Network Error</h1>
          <p>Please check your internet connection!</p>
          <Link href="/">
            <a>
              <button className="contact-btn">Check again</button>
            </a>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Error;
