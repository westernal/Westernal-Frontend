import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function authError() {
  toast.error("Authentication failed, please login again.");
  Cookies.remove("cookieToken");
}
