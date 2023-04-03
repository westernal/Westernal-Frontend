import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Head from "next/head";
import Image from "next/image";
import SignupForm from "../../components/authentication/form/SignupForm";
import FormLoader from "../../components/layout/loader/FormLoader";
import Lottie from "lottie-react";
import jsonFile from "../../public/Images/lf20_2gB0PZ.json";
import postRequest from "../../functions/requests/postRequest";
import Cookies from "js-cookie";

const SignUp = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  async function signup(username, email, password) {
    const result = await postRequest(
      {
        username: username,
        email: email,
        password: password,
      },
      "api/users/signup"
    );

    if (!result) {
      SetLoader(false);
      return;
    }

    if (result?.status == 201) {
      Cookies.set("token", result.data.token);
      toast.success(`Welcome, ${username}!`);
      router.push("/home/timeline");
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
    <main className="flex signup">
      <Head>
        <title>Westernal - Signup</title>
      </Head>
      <section className="app-description flex">
        <h1 id="website-name">westernal</h1>
        <h2>A social media to share your feelings through music.</h2>
        <div className="animation">
          <Lottie animationData={jsonFile} autoplay width={280} height={280} />
        </div>
      </section>
      <section className="auth-form ">
        <Image src={"/Images/logo.png"} alt="logo" width={120} height={120} />

        {loader ? <FormLoader /> : null}

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
