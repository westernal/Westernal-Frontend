import BackHeader from "../../components/layout/BackHeader";

const ForgotPassword = () => {
  const sendEmail = async (e) => {
    e.preventDefault();
  };
  return (
    <>
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
