import { useRouter } from "next/router";

const LogOut = () => {
  const router = useRouter();

  function logOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <button onClick={logOut} id="logout">
      Logout
    </button>
  );
};

export default LogOut;
