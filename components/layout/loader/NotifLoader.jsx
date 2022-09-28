import ContentLoader from "react-content-loader";
import { useEffect, useState } from "react";

const UserLoader = () => {
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
      width={"500"}
      height={"40"}
      viewBox="0 0 500 40"
      backgroundColor={bgColor}
      foregroundColor="#ecebeb"
    >
      <rect x="10" y="15" rx="5" ry="5" width="290" height="10" />
    </ContentLoader>
  );
};

export default UserLoader;
