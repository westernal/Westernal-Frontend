import { useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { getCookie } from "cookies-next";

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  let userID: string;
  let userName: string;

  useEffect(() => {
    getTokenInfo(getCookie("cookieToken"));
  }, []);

  const getTokenInfo = (token: any) => {
    const jwt: any = jwtDecode(token);

    userID = jwt.userId;
    userName = jwt.username;
  };

  return (
    <UserContext.Provider value={{ userName, userID }}>
      {children}
    </UserContext.Provider>
  );
};
