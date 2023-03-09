import Head from "next/head";
import BackHeader from "../../../components/layout/header/BackHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import FormLoader from "../../../components/layout/loader/FormLoader";
import postRequest from "../../../functions/requests/postRequest";

const ForgotPassword = () => {
  const [loader, SetLoader] = useState(false);

  const checkEmailInput = (e) => {
    e.preventDefault();
    SetLoader(true);
    const email = document.getElementById("email").value.toLowerCase();

    if (!email) {
      toast.error("Enter your email");
      SetLoader(false);
      return;
    }

    sendEmail(email);
  };

  const sendEmail = async (email) => {
    const result = await postRequest(
      {
        email: email,
      },
      "api/users/reset-password"
    );

    if (!result) {
      SetLoader(false);
      return;
    }

    if (result?.status == 200) {
      toast.success("Email sent!");
      SetLoader(false);
      document.getElementById("email-btn").innerText = "Send again";
    } else {
      toast.error(result?.data?.message);
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
          {loader ? <FormLoader /> : null}
          <p id="reset-text">
            Enter your email so that we can send you a reset link!
          </p>
          <form onSubmit={checkEmailInput}>
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
