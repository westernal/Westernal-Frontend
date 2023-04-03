import Cookies from "js-cookie";
import API from "./API";

export default async function getRequest(path, auth = false, authToken) {
  if (auth && !authToken) {
    authToken = Cookies.get("token").toString();
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
