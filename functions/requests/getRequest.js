import { toast } from "react-toastify";
import API from "./API";

export default async function getRequest(path, auth = false, authToken) {
  if (auth && !authToken) {
    authToken = localStorage.getItem("token");
  }
  const options = {
    method: "GET",
    headers: auth
      ? {
          Authorization: "Bearer " + authToken,
        }
      : {},
    redirect: "follow",
    mode: "cors",
    credentials: "include",
  };

  try {
    var result = await API(options, path);
  } catch (error) {
    toast.error("Server Error! Please try again.");
    return;
  }

  return result;
}
