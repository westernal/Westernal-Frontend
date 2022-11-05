import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../requests/API";
import Image from "next/image";
import LoginForm from "./form/LoginForm";

const Login = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  async function login(username, password) {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      redirect: "follow",
    };

    try {
      var result = await API(option, "api/users/login");
    } catch (error) {
      toast.error("Server Error! Please try again.");
      SetLoader(false);
    }

    if (result && result.status == 200) {
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
    <div className="login flex">
      <div className="auth-form">
        <Image src={"/Images/logo.png"} alt="logo" width={120} height={120} />
        {loader && (
          <div className="flex">
            <div className="logo-loader flex">
              <p id="loader">w</p>
            </div>
          </div>
        )}

        <LoginForm login={login} changeLoader={changeLoader} />

        <div className="flex">
          <hr /> OR <hr />
        </div>

        <div className="flex">
          <p>Don{"'"}t have an account?</p>
          <Link href={"/user/signup"}>signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
