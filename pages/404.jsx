import Footer from "../components/layout/Footer";
import BackHeader from "../components/layout/BackHeader";
import Image from "next/image";

const Error = () => {
  return (
    <div className="404">
      <BackHeader title={"Error"} />

      <div className="flex">
        <div className="auth-form">
          <Image src={"/Images/logo.png"} width={90} height={90} />
          <h1>404 - Page not found</h1>
          <h2>Looks like the link you're looking for doesn{"'"}t exist!</h2>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Error;
