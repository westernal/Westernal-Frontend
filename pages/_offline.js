import Footer from "../components/layout/Footer";
import Head from "next/head";

const Error = () => {
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
          <h1>Network Error</h1>
          <p>Please check your internet connection!</p>
          <a href="#" onClick={checkNetwork}>
            <button className="contact-btn">Check again</button>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Error;
