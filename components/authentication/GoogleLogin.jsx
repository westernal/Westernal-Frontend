import { GoogleLogin } from "react-google-login";
import API from "../../requests/API";

const GoogleLogin = () => {
  const googleLogin = async (res) => {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: res.profileObj.email,
      }),
      redirect: "follow",
    };

    try {
      var result = await API(option, "api/users/login/google");
    } catch (error) {
      toast.error("Server Error! Please try again.");
    }

    if (result && result.status == 200) {
      localStorage.setItem("token", result.data.token);
      toast.success(`Welcome, ${result.data.username}!`);
      router.push("/home");
    } else {
      toast.error(result.data.message);
    }
  };

  const googleError = () => {
    toast.error("Login failed!");
  };

  return (
    <div className="flex google">
      <GoogleLogin
        clientId="http://764903312753-lfjbsd7k2lepc64g12b8pkabhekpcbij.apps.googleusercontent.com/"
        buttonText="Login"
        onSuccess={googleLogin}
        onFailure={googleError}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLogin;
