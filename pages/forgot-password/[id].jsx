import API from "../../requests/API";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/dist/shared/lib/head";
import BackHeader from "../../components/layout/BackHeader";

const ChangePassword = () => {
  const router = useRouter();
  const [loader, SetLoader] = useState(false);

  const editPassword = async (e) => {
    e.preventDefault();
    SetLoader(true);

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password.length < 6 && password.length !== 0) {
      toast.error("Password must be more than 6 characters!");
      SetLoader(false);
    }

    if (password !== confirmPassword) {
      toast.error("Password must be equal to repeat password!");
      SetLoader(false);
    }

    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
      }),
      redirect: "follow",
    };

    var result = await API(
      option,
      `api/users/edit/password/${router.query.id}`
    );

    if (result.status == 200) {
      toast.success(`Password changed!`);
      SetLoader(false);
      router.push(`/`);
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
          <form onSubmit={editPassword}>
            <div className="form-inputs">
              <input
                type="password"
                placeholder="New password"
                id="password"
                autoComplete="off"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirm-password"
                autoComplete="off"
              />
            </div>

            <div className="flex">
              <button className="btn" type="submit">
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
