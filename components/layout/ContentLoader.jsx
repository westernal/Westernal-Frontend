import ContentLoader from "react-content-loader";
import { useEffect, useState } from "react";

const PostLoader = () => {
  const [bgColor, SetBgColor] = useState("#f3f3f3");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      SetBgColor("#5f5d5d");
    }
  }, []);

  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100%"}
      viewBox="0 0 320 420"
      backgroundColor={bgColor}
      foregroundColor="#ecebeb"
    >
      <circle cx="25" cy="29" r="11" />
      <rect x="45" y="25" rx="2" ry="2" width="100" height="10" />
      <rect x="0" y="54" rx="2" ry="2" width="320" height="276" />
      <rect x="12" y="345" rx="0" ry="0" width="90" height="12" />
      <rect x="12" y="365" rx="0" ry="0" width="130" height="10" />
      <circle cx="20" cy="405" r="9" />
      <rect x="40" y="397" rx="0" ry="0" width="17" height="17" />
      <rect x="215" y="400" rx="0" ry="0" width="90" height="12" />
    </ContentLoader>
  );
};

export default PostLoader;
