import { toast } from "react-toastify";

const SignupForm = ({ signup, changeLoader }) => {
  function checkInputs(e: any) {
    e.preventDefault();
    changeLoader("on");
    const password = document.getElementById("password") as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;
    const username = document.getElementById("username") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;

    let correctedUsername = username.value.replace(/\s+/g, "");

    if (username.value == "") {
      toast.error("Username must be included!");
      changeLoader("off");
      return;
    }

    if (email.value == "") {
      toast.error("Email must be included!");
      changeLoader("off");
      return;
    }

    if (!email.value.includes("@")) {
      toast.error("Enter a valid Email!");
      changeLoader("off");
      return;
    }

    if (password.value.length < 6) {
      toast.error("Password must be more than 6 characters!");
      changeLoader("off");
      return;
    }

    if (password.value !== confirmPassword.value) {
      toast.error("Password must be equal to repeat password!");
      changeLoader("off");
      return;
    } else
      signup(
        correctedUsername.toLowerCase(),
        email.value.toLowerCase(),
        password.value
      );
  }
  return (
    <form onSubmit={checkInputs} autoComplete="off">
      <section className="form-inputs">
        <input type="text" placeholder="Username" id="username" />
        <input type="text" placeholder="Email" id="email" />
        <input type="password" placeholder="Password" id="password" />
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirm-password"
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
