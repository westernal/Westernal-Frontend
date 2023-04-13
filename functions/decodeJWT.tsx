import jwtDecode from "jwt-decode";
import authError from "./authError";

interface Decode {
  userId: string;
  username: string;
}

export default function decodeJWT(token: string): Decode {
  let decodedToken: Decode;

  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    authError();
  }

  return decodedToken;
}
