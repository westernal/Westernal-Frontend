import API from "../../requests/API";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/dist/shared/lib/head";
import BackHeader from "../../components/layout/BackHeader";

const ChangePassword = () => {
  const router = useRouter();

  const editPassword = async (e) => {
    e.preventDefault();

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

    let newBody = new FormData();

    newBody.append("password", password);

    const option = {
      method: "POST",
      body: newBody,
      redirect: "follow",
    };

    var result = await API(
      option,
      `api/users/edit/password/${router.query.id}`
    );

    if (result.status == 200) {
      toast.success(`Password changed!`);
      router.push(`/`);
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
