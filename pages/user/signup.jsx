import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../requests/API";
import Head from "next/head";
import Image from "next/image";
import SignupForm from "../../components/authentication/form/SignupForm";
import FormLoader from "../../components/layout/loader/FormLoader";
import Lottie from "react-lottie-player";
import jsonFile from "../../public/Images/lf20_2gB0PZ.json";

const SignUp = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  async function signup(username, email, password) {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      redirect: "follow",
    };

    try {
      var result = await API(option, "api/users/signup");
    } catch (error) {
      toast.error("Server Error! Please try again.");
      SetLoader(false);
    }

    if (result && result.status == 201) {
      localStorage.setItem("token", result.data.token);
      toast.success(`Welcome, ${username}!`);
      router.push("/home/timeline");
    } else {
      SetLoader(false);
      toast.error(result.data.message);
    }
  }

  const changeLoader = (loader) => {
    if (loader === "off") {
      SetLoader(false);
    } else if (loader === "on") {
      SetLoader(true);
    }
  };

  return (
    <main className="flex signup">
      <Head>
        <title>Westernal - Signup</title>
      </Head>
      <section className="app-description flex">
        <h1 id="website-name">westernal</h1>
        <h1>A social media to share your feelings through music.</h1>
        <Lottie
          loop
          animationData={jsonFile}
          play
          style={{ width: 300, height: 300 }}
        />
      </section>
      <section className="auth-form ">
        <Image src={"/Images/logo.png"} alt="logo" width={120} height={120} />

        {loader && <FormLoader />}

        <SignupForm signup={signup} changeLoader={changeLoader} />

        <section id="login-link">
          <div className="flex">
            <hr /> OR <hr />
          </div>

          <div className="flex">
            <p>Have an account?</p>
            <Link href={"/"}>login</Link>
          </div>
        </section>
      </section>
    </main>
  );
};

export default SignUp;
