import "../styles/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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
        <meta name="msapplication-TileColor" content="#9d38fc" />
        <link
          rel="icon"
          href="https://westernal.net/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
