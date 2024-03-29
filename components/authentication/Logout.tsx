"use client";

import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

const LogOut = () => {
  const router = useRouter();

  function logOut(e: any) {
    e.preventDefault();
    deleteCookie("cookieToken");
    router.push("/");
  }

  return (
    <button onClick={logOut} id="logout">
      Logout
    </button>
  );
};

export default LogOut;
