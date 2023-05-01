import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="apple-touch-icon" href="/Images/icon-192x192.png" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link
            rel="mask-icon"
            href="/Images/safari-pinned-tab.svg"
            color="#9d38fc"
          />
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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
