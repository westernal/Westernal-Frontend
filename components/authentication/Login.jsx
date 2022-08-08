import Link from "next/link";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../requests/API";

const Login = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  const showPassword = () => {
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

  function responseGoogle(res) {}

  return (
    <div className="login flex">
      <div className="auth-form">
        <p id="login-logo">W</p>
        {loader && (
          <div className="flex">
            <div className="logo-loader flex">
              <p id="loader">w</p>
            </div>
          </div>
        )}
        <form onSubmit={checkInputs}>
          <div className="form-inputs">
            <input type="text" placeholder="Username" id="username" />

            <input type="password" placeholder="Password" id="password" />
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
        <div className="flex google">
          {/* <GoogleLogin
            clientId=""
            buttonText="Login"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
        </div>
        <div className="flex">
          <p>Don{"'"}t have an account?</p>
          <Link href={"/signup"}>
            <a aria-label="signup">signup</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
