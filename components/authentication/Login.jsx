import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import LoginForm from "./form/LoginForm";
import FormLoader from "../layout/loader/FormLoader";
import Lottie from "react-lottie-player";
import jsonFile from "../../public/Images/lf20_2gB0PZ.json";
import postRequest from "../../functions/requests/postRequest";

const Login = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  async function login(username, password) {
    const result = await postRequest(
      {
        username: username,
        password: password,
      },
      "api/users/login"
    );

    if (!result) {
      SetLoader(false);
      return;
    }

    switch (result?.status) {
      case 200:
        localStorage.setItem("token", result.data.token);
        toast.success(`Welcome, ${username}!`);
        router.push("/home/timeline");
        break;
      case 402:
        router.push("/user/forgot-password");
        toast.error(result.data.message);
        break;
      default:
        toast.error(result.data.message);
        break;
    }

    SetLoader(false);
  }

  const changeLoader = (loader) => {
    if (loader === "off") {
      SetLoader(false);
    } else if (loader === "on") {
      SetLoader(true);
    }
  };

  return (
    <main className="login flex">
      <section className="app-description flex">
        <h1 id="website-name">westernal</h1>
        <h2>A social media to share your feelings through music.</h2>
        {!userAgent.match(/safari/i) ? (
          <Lottie
            animationData={jsonFile}
            play
            style={{ width: 300, height: 300 }}
          />
        ) : null}
      </section>
      <section className="auth-form">
        <Image src={"/Images/logo.png"} alt="logo" width={120} height={120} />

        {loader ? <FormLoader /> : null}

        <LoginForm login={login} changeLoader={changeLoader} />

        <section id="signup-link">
          <div className="flex">
            <hr /> OR <hr />
          </div>
          <div className="flex">
            <p>Don{"'"}t have an account?</p>
            <Link href={"/user/signup"}>signup</Link>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Login;
