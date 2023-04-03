import { toast } from "react-toastify";
import API from "./API";
import Cookies from "js-cookie";

export default async function postRequest(body, path, auth = false, authToken) {
  if (auth && !authToken) {
    authToken = Cookies.get("token").toString();
  }

  const options = {
    method: "POST",
    headers: auth
      ? {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        }
      : { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    redirect: "follow",
  };

  try {
    var result = await API(options, path);
  } catch (error) {
    toast.error("Server Error! Please try again.");
    return;
  }

  return result;
}
