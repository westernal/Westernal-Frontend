import Footer from "../components/layout/Footer";
import BackHeader from "../components/layout/header/BackHeader";
import Head from "next/head";

const Error = () => {
  return (
    <div className="error-page">
      <Head>
        <title>No internet - Westernal</title>
      </Head>
      <BackHeader title={"Error"} />

      <div className="flex">
        <div className="auth-form">
          <h1>Network Error</h1>
          <p>Please check your internet connection!</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Error;
