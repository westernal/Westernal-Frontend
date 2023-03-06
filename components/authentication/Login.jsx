import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../requests/API";
import Image from "next/image";
import LoginForm from "./form/LoginForm";
import FormLoader from "../layout/loader/FormLoader";
import Lottie from "react-lottie-player";
import jsonFile from "../../public/Images/lf20_2gB0PZ.json";

const Login = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();
  let result;

  async function login(username, password) {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Access: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      redirect: "follow",
      mode: "cors",
      credentials: "include",
    };

    try {
      result = await API(option, "api/users/login");
    } catch (error) {
      toast.error("Server Error! Please try again.");
      SetLoader(false);
      return;
    }

    if (result.status == 200) {
      localStorage.setItem("token", result.data.token);
      toast.success(`Welcome, ${username}!`);
      router.push("/home/timeline");
    } else if (result.status === 403) {
      router.push("/user/forgot-password");
      toast.error(result.data.message);
    } else {
      toast.error(result.data.message);
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
        <Lottie
          loop
          animationData={jsonFile}
          play
          style={{ width: 300, height: 300 }}
        />
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
