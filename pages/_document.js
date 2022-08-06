import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  constructor(props) {
    super(props);
    this.state = { isLight: true };
  }

  componentDidMount() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.setState({
        isLight: false,
      });
    }
  }

  render() {
    return (
      <Html lang="fa">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/Images/icon-192x192.png" />
          <link
            rel="shortcut icon"
            href="Images/favicon.ico"
            type="image/x-icon"
          />
          <link rel="icon" href="/Images/favicon.ico" type="image/x-icon" />
          <meta
            name="theme-color"
            content={this.state.isLight ? "#9d38fc" : "#1d034a"}
          />
          <meta
            name="background-color"
            content={this.state.isLight ? "#FFFFF" : "#00000"}
          />
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
