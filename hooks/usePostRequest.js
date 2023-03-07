import { toast } from "react-toastify";
import API from "../requests/API";

export default async function usePostRequest(
  body,
  path,
  auth = false,
  authToken = localStorage.getItem("token")
) {
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
