import Head from "next/head";
import BackHeader from "../../components/layout/BackHeader";
import { toast } from "react-toastify";
import API from "../../requests/API";
import { useState } from "react";

const ForgotPassword = () => {
  const [loader, SetLoader] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    SetLoader(true);
    const email = document.getElementById("email").value.toLowerCase();

    if (!email) {
      toast.error("Enter your email");
      SetLoader(false);
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
      SetLoader(false);
      document.getElementById("email-btn").innerText = "Send again";
    } else {
      toast.error(result.data.message);
      SetLoader(false);
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
          {loader && (
            <div className="flex">
              <div className="logo-loader flex">
                <p id="loader">w</p>
              </div>
            </div>
          )}
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
              <button className="btn" type="submit" id="email-btn">
                Send email
              </button>
            </div>
            <p style={{ opacity: 0.5 }}>This link will expire in 1 hour.</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
