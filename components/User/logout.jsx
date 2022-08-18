import { useRouter } from "next/router";

const LogOut = () => {
  const router = useRouter();

  function logOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <a href="#" onClick={logOut}>
      <button>Logout</button>
    </a>
  );
};

export default LogOut;
