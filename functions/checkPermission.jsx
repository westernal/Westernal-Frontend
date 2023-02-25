import jwtDecode from "jwt-decode";

export default function checkPermission(router, checkUser = false) {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/");
    return false;
  }

  if (checkUser) {
    if (
      router.query.username &&
      router.query.username !== jwtDecode(token).username
    ) {
      router.push(`/${jwtDecode(token).username}`);
      return false;
    }
  }

  return true;
}
