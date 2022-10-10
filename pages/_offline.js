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
          <p id="login-logo">W</p>
          <h1>Network Error</h1>
          <p>Please check your internet connection!</p>
          <button className="contact-btn" onClick={checkNetwork}>
            Check again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
