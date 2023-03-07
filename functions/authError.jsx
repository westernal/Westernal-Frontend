import { toast } from "react-toastify";

export default function authError() {
  toast.error("Authentication failed, please login again.");
  // localStorage.removeItem("token");
  // location.reload();
}
