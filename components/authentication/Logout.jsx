import Cookies from "js-cookie";
import { useRouter } from "next/router";

const LogOut = () => {
  const router = useRouter();

  function logOut(e) {
    e.preventDefault();
    Cookies.remove("cookieToken");
    router.push("/");
  }

  return (
    <button onClick={logOut} id="logout">
      Logout
    </button>
  );
};

export default LogOut;
