import jwtDecode from "jwt-decode";
import authError from "./authError";

export default function decodeJWT(token) {
  let decodedToken;

  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    authError();
  }

  return decodedToken;
}
