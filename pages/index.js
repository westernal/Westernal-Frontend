import Loader from "../components/layout/loader/Loader";
import { useEffect } from "react";
import Head from "next/head";
import Login from "../components/authentication/Login";
import { useRouter } from "next/router";
import PWAModal from "../components/layout/PWAModal";

export default function Index() {
  const router = useRouter();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function startLoaderPreview() {
      await sleep(500);
      if (localStorage.getItem("token")) {
        await router.push("/home/timeline");
      } else if (document.getElementsByClassName("loader")[0] && localStorage) {
        document.getElementsByClassName("loader")[0].style.display = "none";
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
      <Loader />
      <PWAModal />
      <Login />
    </div>
  );
}
