import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

export default function useAuth() {
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (getCookie("cookieToken")) {
      SetIsLoggedIn(true);
    }
  }, []);

  return [isLoggedIn];
}
