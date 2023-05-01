import "../styles/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, useEffect } from "react";
import ErrorBoundary from "../components/error/ErrorBoundary";
import type { AppProps } from "next/app";
import HeadTags from "../utils/HeadTags";
import Loader from "../components/layout/loader/Loader";

function MyApp({ Component, pageProps }: AppProps) {
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
        <Suspense fallback={<Loader />}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
