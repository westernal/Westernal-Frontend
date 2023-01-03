import { useRouter } from "next/router";

export default async function checkPermission() {
  const router = useRouter();

  if (!localStorage.getItem("token")) {
    router.push("/");
    return;
  }
}
