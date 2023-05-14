import { useEffect } from "react";
import Head from "next/head";
import Login from "../components/authentication/Login";
import PWAModal from "../components/layout/PWAModal";

export default function Index() {
  useEffect(() => {
    async function startLoaderPreview() {
      var x = window.matchMedia("(max-width: 922px)");

      if (
        x.matches &&
        !window.matchMedia("(display-mode: standalone)").matches
      ) {
        document.querySelector("dialog").showModal();
      }
    }

    startLoaderPreview();
  }, []);
  return (
    <>
      <Head>
        <title>Westernal: Let the songs talk</title>
      </Head>
      <PWAModal />
      <Login />
    </>
  );
}
