import "../styles/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useEffect } from "react";
import ErrorBoundary from "../components/error/ErrorBoundary";
import type { AppProps } from "next/app";
import HeadTags from "../utils/HeadTags";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("splash-screen");
      if (loader) loader.style.display = "none";
    }
  }, []);

  return (
    <>
      <HeadTags />
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
