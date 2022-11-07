import { toast } from "react-toastify";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useEffect } from "react";

const LoginForm = ({ login, changeLoader }) => {
  let isRecaptchasucceed = false;
  const [theme, SetTheme] = useState("light");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      SetTheme("dark");
    }
  }, []);

  const recaptchaSuccess = (value) => {
    isRecaptchasucceed = true;
  };

  function checkInputs(e) {
    e.preventDefault();

    changeLoader("on");
    const password = document.getElementById("password");
    const username = document.getElementById("username");

    if (!isRecaptchasucceed) {
      toast.error("Please complete reCaptcha.");
      changeLoader("off");
      return;
    }

    if (username.value == "") {
      toast.error("Username must be included!");
      changeLoader("off");
      return;
    }

    if (password.value.length < 6) {
      toast.error("Password must be more than 6 characters!");
      changeLoader("off");
      return;
    } else login(username.value.toLowerCase(), password.value);
  }

  const showPassword = (e) => {
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

  return (
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
              <Link href="/user/forgot-password">Forgot password?</Link>
            </div>
          </div>
        </section>
      </div>

      <div className="flex recaptcha">
        <ReCAPTCHA
          sitekey="6Lc3lOkiAAAAALbL2C0Nm29wMEchKw9nD-W3KYX9"
          onChange={recaptchaSuccess}
          theme={theme}
          onError={() => {
            location.reload();
          }}
        />
      </div>

      <div className="flex">
        <button className="btn" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
