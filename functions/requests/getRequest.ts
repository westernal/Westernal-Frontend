import { getCookie } from "cookies-next";
import API from "./API";

export default async function getRequest(path:string, auth: boolean = false, authToken?:string) {
  if (auth && !authToken) {
    authToken = getCookie("cookieToken").toString();
  }
  const options = {
    method: "GET",
    headers: auth
      ? {
          Authorization: "Bearer " + authToken,
        }
      : {},
    redirect: "follow",
  };

  try {
    var result = await API(options, path);
  } catch (error) {
    return;
  }

  return result;
}
