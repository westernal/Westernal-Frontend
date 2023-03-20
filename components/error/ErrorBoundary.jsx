import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <Head>
            <title>500 - Westernal</title>
          </Head>

          <div className="flex">
            <div className="auth-form">
              <Image
                src={"/Images/logo.png"}
                width={90}
                height={90}
                alt="logo"
              />
              <h1>500 - Error</h1>
              <p>
                Sorry it seems like there is an error in website, we will try to
                fix this as soon as possible!
              </p>
              <div className="flex error-btns">
                <Link href="/">
                  <button id="cancel-delete">Go to home page</button>
                </Link>
                <a href="https://github.com/westernal/social-media-frontend/issues">
                  <button id="confirm-delete">Report this error</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
