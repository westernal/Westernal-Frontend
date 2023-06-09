import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import BackHeader from "../../../components/layout/header/BackHeader";
import FormLoader from "../../../components/layout/loader/FormLoader";
import decodeJWT from "../../../functions/decodeJWT";
import postRequest from "../../../functions/requests/postRequest";

const ChangePassword = () => {
  const router: any = useRouter();
  const [loader, SetLoader] = useState(false);

  const getUserId = (e: any) => {
    e.preventDefault();
    SetLoader(true);
    let id: string;

    try {
      id = decodeJWT(router.query.token).userId;
    } catch (error) {
      toast.error("Link expired!");
      router.push("/");
      return;
    }

    checkPassword(id);
  };

  const checkPassword = (userId: string) => {
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById("confirm-password") as HTMLInputElement
    ).value;

    if (password.length < 6 && password.length !== 0) {
      toast.error("Password must be more than 6 characters!");
      SetLoader(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password must be equal to repeat password!");
      SetLoader(false);
      return;
    }

    editPassword(password, userId);
  };

  const editPassword = async (password: string, userId: string) => {
    const result = await postRequest(
      {
        password: password,
      },
      `api/users/edit/password/${userId}`,
      true,
      router.query.token
    );

    if (result?.status == 200) {
      toast.success(`Password changed!`);
      SetLoader(false);
      router.push(`/`);
    } else {
      toast.error(result?.data?.message);
      SetLoader(false);
    }
  };
  return (
    <>
      <BackHeader title="Reset Password" />
      <main className=" flex reset-password">
        <section className="auth-form">
          <p id="login-logo">W</p>
          {loader ? <FormLoader /> : null}
          <form onSubmit={getUserId}>
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
