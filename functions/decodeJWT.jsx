import jwtDecode from "jwt-decode";
import authError from "./authError";

export default function decodeJWT(token) {
  let decodedToken;
  const Token = JSON.stringify(token);

  try {
    decodedToken = jwtDecode(Token);
  } catch (error) {
    authError();
  }

  return decodedToken;
}
