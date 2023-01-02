import Document, { Html, Head, Main, NextScript } from "next/document";
import Loader from "../components/layout/loader/Loader";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/Images/icon-192x192.png" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link
            rel="mask-icon"
            href="/Images/safari-pinned-tab.svg"
            color="#9d38fc"
          />
          <meta name="msapplication-TileColor" content="#9d38fc" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta name="theme-color" content="#9d38fc" />
          <meta name="background-color" content="#FFFFF" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="description"
            content="Login to Westernal: a social media to share your feelings through songs and music."
          />
          <meta
            name="keywords"
            content="Westernal, social media, music, songs"
          />
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
        <body>
          <Loader />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
