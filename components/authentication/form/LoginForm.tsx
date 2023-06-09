import { toast } from "react-toastify";
import Link from "next/link";

const LoginForm = ({ login, changeLoader }) => {
  const getInputsValues = (e: any) => {
    e.preventDefault();
    changeLoader("on");
    const password = document.getElementById("password") as HTMLInputElement;
    const username = document.getElementById("username") as HTMLInputElement;
    checkInputs(username.value.toLowerCase(), password.value);
  };

  const checkInputs = (username: string, password: string) => {
    if (username == "") {
      toast.error("Username must be included!");
      changeLoader("off");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be more than 6 characters!");
      changeLoader("off");
      return;
    } else login(username, password);
  };

  const changeCheckboxColor = (checkBox: any) => {
    if (checkBox.style.backgroundColor === "inherit") {
      checkBox.style.backgroundColor = "#5f5d5d";
    } else checkBox.style.backgroundColor = "inherit";
  };

  const showPassword = (e: any) => {
    changeCheckboxColor(e.target);
    const password = document.getElementById("password") as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <form onSubmit={getInputsValues} autoComplete="on">
      <section className="form-inputs">
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
      </section>

      <div className="flex">
        <button className="btn" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
