import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

export default function useAuth() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    if (getCookie("cookieToken")) {
      SetIsLoggedIn(true);
    }
  }, []);

  return [isLoggedIn];
}
