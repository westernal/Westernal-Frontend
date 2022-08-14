import Footer from "../components/layout/Footer";
import BackHeader from "../components/layout/BackHeader";
import Image from "next/image";
import Head from "next/head";

const Error = () => {
  return (
    <div className="404">
      <Head>
        <title>No internet - Westernal</title>
      </Head>
      <BackHeader title={"Error"} />

      <div className="flex">
        <div className="auth-form">
          <Image src={"/Images/logo.png"} width={90} height={90} alt="logo" />
          <h1>Network Error</h1>
          <h2>Please check your internet connection!</h2>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Error;
