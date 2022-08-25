import jwtDecode from "jwt-decode";
import API from "./API";

export default async function getNewNotifications(params) {
  const userId = jwtDecode(localStorage.getItem("token")).userId;
  const option = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  var result = await API(option, `api/users/notification/${userId}`);

  if (result.status == 200) {
    return result.data.notifications;
  } else return 0;
}
