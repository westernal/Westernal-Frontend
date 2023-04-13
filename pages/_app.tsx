import "../styles/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useEffect } from "react";
import ErrorBoundary from "../components/error/ErrorBoundary";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("splash-screen");
      if (loader) loader.style.display = "none";
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta
          name="description"
          content="Login to Westernal: a social media to share your feelings through songs and music."
        />
        <meta name="keywords" content="Westernal, social media, music, songs" />
        <meta name="image" content="https://i.postimg.cc/fykmjgyZ/logo.png" />
        <meta name="robots" content="noodp,noydir" />
        <link rel="apple-touch-icon" href="/Images/icon-192x192.png" />
        <link
          rel="shortcut icon"
          href="https://westernal.net/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="mask-icon"
          href="/Images/safari-pinned-tab.svg"
          color="#9d38fc"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link
          href="/Images/splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/Images/splashscreens/iphonexr_splash.png"
          media="(device-width: 390px) and (device-height: 844) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <meta name="msapplication-TileColor" content="#9d38fc" />
        <link
          rel="icon"
          href="https://westernal.net/favicon.ico"
          type="image/x-icon"
        />
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
      </Head>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        style={{ marginBottom: "50px" }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
