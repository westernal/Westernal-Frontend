import ContentLoader from "react-content-loader";
import { useEffect, useState } from "react";

const UserLoader = () => {
  const [bgColor, SetBgColor] = useState<string>("#f3f3f3");

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
      height={"100"}
      viewBox="0 0 500 100"
      backgroundColor={bgColor}
      foregroundColor="#ecebeb"
    >
      <rect x="10" y="15" rx="5" ry="5" width="100" height="10" />
      <rect x="10" y="40" rx="5" ry="5" width="200" height="10" />
      <rect x="10" y="70" rx="5" ry="5" width="30" height="10" />
      <rect x="50" y="70" rx="5" ry="5" width="30" height="10" />
    </ContentLoader>
  );
};

export default UserLoader;
