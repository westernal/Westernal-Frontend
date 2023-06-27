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
import { setCookie } from "cookies-next";

const SignUp = () => {
  const [loader, SetLoader] = useState<boolean>(false);
  const router: any = useRouter();

  async function signup(username: string, email: string, password: string) {
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
      setCookie("token", result.data.token);
      toast.success(`Welcome, ${username}!`);
      router.push("/home/timeline");
    } else {
      toast.error(result.data.message);
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
    <main className="signup">
      <Head>
        <title>Westernal - Signup</title>
      </Head>
      <section className="app-description flex">
        <div className="animation">
          <Lottie animationData={jsonFile} autoplay width={280} height={280} />
        </div>
      </section>
      <section className="auth-form ">
        <h1 id="website-name">westernal</h1>
        <h3>A social media to share your feelings through music.</h3>

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
