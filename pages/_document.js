import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/Images/icon-192x192.png" />
          <link
            rel="shortcut icon"
            href="/Images/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="mask-icon"
            href="/Images/safari-pinned-tab.svg"
            color="#9d38fc"
          />
          <meta name="msapplication-TileColor" content="#9d38fc" />
          <link rel="icon" href="/Images/favicon.ico" type="image/x-icon" />
          <meta name="theme-color" content="#9d38fc" />
          <meta name="background-color" content="#FFFFF" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
