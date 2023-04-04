import { toast } from "react-toastify";
import { removeCookies } from "cookies-next";

export default function authError() {
  toast.error("Authentication failed, please login again.");
  removeCookies("cookieToken");
}
