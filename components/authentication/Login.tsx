import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import LoginForm from "./form/LoginForm";
import FormLoader from "../layout/loader/FormLoader";
import Lottie from "lottie-react";
import jsonFile from "../../public/Images/lf20_2gB0PZ.json";
import postRequest from "../../functions/requests/postRequest";
import { setCookie } from "cookies-next";

const Login = () => {
  const [loader, SetLoader] = useState<boolean>(false);
  const router = useRouter();

  async function login(username: string, password: string) {
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
        setCookie("cookieToken", result.data.token, {
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
        });
        router.push("/home/timeline");
        toast.success(`Welcome, ${username}!`);
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

  const changeLoader = (loader: string) => {
    if (loader === "off") {
      SetLoader(false);
    } else if (loader === "on") {
      SetLoader(true);
    }
  };

  return (
    <main className="login">
      <section className="app-description flex">
        <div className="animation">
          <Lottie animationData={jsonFile} autoplay width={280} height={280} />
        </div>
      </section>
      <section className="auth-form">
        <h1 id="website-name">westernal</h1>
        <h3>A social media to share your feelings through music.</h3>

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
