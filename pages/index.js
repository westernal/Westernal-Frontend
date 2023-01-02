import { useEffect } from "react";
import Head from "next/head";
import Login from "../components/authentication/Login";
import { useRouter } from "next/router";
import PWAModal from "../components/layout/PWAModal";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    async function startLoaderPreview() {
      if (localStorage.getItem("token")) {
        await router.push("/home/timeline");
      } else if (localStorage) {
        document.getElementsByClassName("login")[0].style.display = "flex";
        var x = window.matchMedia("(max-width: 922px)");

        if (
          x.matches &&
          !window.matchMedia("(display-mode: standalone)").matches
        ) {
          document.getElementById("myModal").style.display = "block";
        }
      }
    }

    startLoaderPreview();
  }, [router]);
  return (
    <div>
      <Head>
        <title>Westernal: Let the songs talk</title>
      </Head>
      <PWAModal />
      <Login />
    </div>
  );
}
