import API from "../../../requests/API";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/dist/shared/lib/head";
import BackHeader from "../../../components/layout/header/BackHeader";
import FormLoader from "../../../components/layout/loader/FormLoader";
import decodeJWT from "../../../functions/decodeJWT";

const ChangePassword = () => {
  const router = useRouter();
  const [loader, SetLoader] = useState(false);

  const editPassword = async (e) => {
    e.preventDefault();
    SetLoader(true);

    let id;

    try {
      id = decodeJWT(router.query.token).userId;
    } catch (error) {
      toast.error("Link expired!");
      router.push("/");
      return;
    }

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
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + router.query.token,
      },
      body: JSON.stringify({
        password: password,
      }),
      redirect: "follow",
    };

    var result = await API(option, `api/users/edit/password/${id}`);

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
        <title>Westernal - Reset Password</title>
      </Head>
      <BackHeader title="Reset Password" />
      <main className=" flex reset-password">
        <section className="auth-form">
          <p id="login-logo">W</p>
          {loader && <FormLoader />}
          <form onSubmit={editPassword}>
            <section className="form-inputs">
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
            </section>

            <div className="flex form-button">
              <button className="btn" type="submit">
                Change password
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default ChangePassword;
