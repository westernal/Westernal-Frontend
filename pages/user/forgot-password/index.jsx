import Head from "next/head";
import BackHeader from "../../../components/layout/header/BackHeader";
import { toast } from "react-toastify";
import API from "../../../requests/API";
import { useState } from "react";
import FormLoader from "../../../components/layout/loader/FormLoader";

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
      SetLoader(false);
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
        <title>Westernal - Reset Password</title>
      </Head>
      <BackHeader title="Reset Password" />
      <main className=" flex reset-password">
        <section className="auth-form">
          <p id="login-logo">W</p>
          {loader && <FormLoader />}
          <p id="reset-text">
            Enter your email so that we can send you a reset link!
          </p>
          <form onSubmit={sendEmail}>
            <section className="form-inputs">
              <input
                type="email"
                placeholder="Email"
                id="email"
                autoComplete="on"
              />
            </section>

            <div className="flex form-button">
              <button className="btn" type="submit" id="email-btn">
                Send email
              </button>
            </div>
            <p style={{ opacity: 0.5 }}>
              Don{"'"}t see an email? Check your spam folder.
            </p>
          </form>
        </section>
      </main>
    </>
  );
};

export default ForgotPassword;
