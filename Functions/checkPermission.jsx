import jwtDecode from "jwt-decode";

export default async function checkPermission(router, checkUser = false) {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/");
    return;
  }

  if (checkUser) {
    if (router.query.username !== jwtDecode(token).username) {
      router.push(`/${jwtDecode(token).username}`);
      return;
    }
  }
}
