import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";

const SignupForm = ({ signup, changeLoader }) => {
  const getInputsValues = (e: any) => {
    e.preventDefault();
    changeLoader("on");

    const password = document.getElementById("password") as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;
    const username = document.getElementById("username") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    let correctedUsername = username.value.replace(/\s+/g, "");

    checkInputs(
      correctedUsername,
      email.value,
      password.value,
      confirmPassword.value
    );
  };

  const checkInputs = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (username == "") {
      toast.error("Username must be included!");
      changeLoader("off");
      return;
    }

    if (email == "") {
      toast.error("Email must be included!");
      changeLoader("off");
      return;
    }

    if (!EmailValidator.validate(email)) {
      toast.error(`Enter a valid Email!`);
      changeLoader("off");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be more than 6 characters!");
      changeLoader("off");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password must be equal to repeat password!");
      changeLoader("off");
      return;
    } else signup(username.toLowerCase(), email.toLowerCase(), password);
  };
  return (
    <form onSubmit={getInputsValues} autoComplete="off">
      <section className="form-inputs">
        <input type="text" placeholder="Username" id="username" />
        <input type="text" placeholder="Email" id="email" />
        <input
          type="password"
          placeholder="Password"
          id="password"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirm-password"
          autoComplete="off"
        />
      </section>

      <div className="flex">
        <button className="btn" type="submit">
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
