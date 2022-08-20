import Head from "next/head";
import BackHeader from "../../components/layout/BackHeader";
import { toast } from "react-toastify";
import API from "../../requests/API";

const ForgotPassword = () => {
  const sendEmail = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    if (!email) {
      toast.error("Enter your email");
      return;
    }

    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
      redirect: "follow",
    };

    try {
      var result = await API(option, "api/users/reset-password");
    } catch (error) {
      toast.error("Server Error! Please try again.");
      return;
    }

    if (result && result.status == 200) {
      toast.success("Email sent!");
    } else {
      toast.error(result.data.message);
    }
  };
  return (
    <>
      <Head>
        <title>Reset Password - Westernal</title>
      </Head>
      <BackHeader title="Reset Password" />
      <div className=" flex reset-password">
        <div className="auth-form">
          <p id="login-logo">W</p>
          <p id="reset-text">
            Enter your email so that we can send you a reset link!
          </p>
          <form onSubmit={sendEmail}>
            <div className="form-inputs">
              <input
                type="email"
                placeholder="Email"
                id="email"
                autoComplete="on"
              />
            </div>

            <div className="flex">
              <button className="btn" type="submit">
                Send email
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
