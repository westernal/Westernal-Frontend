import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";

export default function authError() {
  toast.error("Authentication failed, please login again.");
  deleteCookie("cookieToken");
}
