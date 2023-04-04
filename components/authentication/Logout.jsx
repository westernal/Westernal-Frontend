import { useRouter } from "next/router";
import { removeCookie } from "cookies-next";

const LogOut = () => {
  const router = useRouter();

  function logOut(e) {
    e.preventDefault();
    removeCookie("cookieToken");
    router.push("/");
  }

  return (
    <button onClick={logOut} id="logout">
      Logout
    </button>
  );
};

export default LogOut;
