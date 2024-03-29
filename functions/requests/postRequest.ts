import { toast } from "react-toastify";
import API from "./API";
import { getCookie } from "cookies-next";

export default async function postRequest(body: any, path:string, auth:boolean = false, authToken?:string) {
  if (auth && !authToken) {
    authToken = getCookie("cookieToken").toString();
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
