import { useEffect, useState } from "react";
import decodeJWT from "../functions/decodeJWT";

export default function useAuth(router, checkUser = false) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      setRender(false);
      return;
    } else setRender(true);

    if (checkUser && router.query) {
      if (
        router.query.username &&
        router.query.username !== decodeJWT(token).username
      ) {
        router.push(`/${decodeJWT(token).username}`);
        setRender(false);
      }
    }
  }, [router.query]);

  return render;
}
