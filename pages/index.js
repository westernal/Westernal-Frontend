import Loader from "../components/layout/Loader";
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
        await router.push("/home");
      } else if (document.getElementsByClassName("loader")[0] && localStorage) {
        document.getElementsByClassName("loader")[0].style.display = "none";
        document.getElementsByClassName("login")[0].style.display = "flex";
        var x = window.matchMedia("(max-width: 922px)");

        if (x.matches) {
          document.getElementById("myModal").style.display = "block";
        }
      }
    }

    startLoaderPreview();
  }, [router]);
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="google-site-verification"
          content="obTV1STSza2467gj0NbcnQ63napdJ3UUW5-lPidbe5E"
        />
        <meta
          name="google-site-verification"
          content="UfPIJU4aAZBTOrz6zWgJVzS5gc41FIo0X4Y1e8SBZkM"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <title>Westernal</title>
        <meta name="description" content="A social media" />
        <meta name="keywords" content="Westernal social media" />
      </Head>
      <Loader />
      <PWAModal />
      <Login />
    </div>
  );
}
