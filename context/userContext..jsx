import { useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  let userID;
  let userName;

  useEffect(() => {
    getTokenInfo(localStorage.getItem("token"));
  }, []);

  const getTokenInfo = (token) => {
    const jwt = jwtDecode(token);

    userID = jwt.userId;
    userName = jwt.username;
  };

  return (
    <UserContext.Provider value={{ userName, userID }}>
      {children}
    </UserContext.Provider>
  );
};
