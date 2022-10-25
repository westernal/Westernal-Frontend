import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../requests/API";
import Image from "next/image";

const Login = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  const showPassword = (e) => {
    console.log(e.target.style.backgroundColor);
    if (e.target.style.backgroundColor === "inherit") {
      e.target.style.backgroundColor = "#5f5d5d";
    } else e.target.style.backgroundColor = "inherit";

    var password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

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
      router.push("/home");
    } else {
      SetLoader(false);
      toast.error(result.data.message);
    }
  }

  function checkInputs(e) {
    e.preventDefault();

    SetLoader(true);
    const password = document.getElementById("password");
    const username = document.getElementById("username");

    if (username.value == "") {
      toast.error("Username must be included!");
      SetLoader(false);
      return;
    }

    if (password.value.length < 6) {
      toast.error("Password must be more than 6 characters!");
      SetLoader(false);
      return;
    } else login(username.value.toLowerCase(), password.value);
  }

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
        <form onSubmit={checkInputs}>
          <div className="form-inputs">
            <input
              type="text"
              placeholder="Username"
              id="username"
              autoComplete="on"
            />

            <input
              type="password"
              placeholder="Password"
              id="password"
              autoComplete="on"
            />
            <section className="flex">
              <div className="flex password-options">
                <div className="flex ">
                  <div className="show-password">
                    <div
                      className="checkbox"
                      onClick={showPassword}
                      style={{ backgroundColor: "inherit" }}
                    ></div>
                    <p className="show">Show password</p>
                  </div>
                </div>
                <div className="flex forgot-password">
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
              </div>
            </section>
          </div>

          <div className="flex">
            <button className="btn" type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="flex">
          <hr /> OR <hr />
        </div>

        <div className="flex">
          <p>Don{"'"}t have an account?</p>
          <Link href={"/signup"}>signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
