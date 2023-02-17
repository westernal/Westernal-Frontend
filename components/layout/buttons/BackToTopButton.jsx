import Image from "next/image";
import { useEffect } from "react";

const BackToTopButton = () => {
  const checkButtonVisiblity = () => {
    const button = document.getElementById("top-button");
    if (button) {
      if (window.scrollY !== 0) {
        button.classList.add("active");
      } else button.classList.remove("active");
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", checkButtonVisiblity);
  }, []);

  const goToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    checkButtonVisiblity();
  };

  return (
    <button id="top-button" onClick={goToTop}>
      <Image
        src={"/Images/Up Arrow.svg"}
        width={20}
        height={20}
        alt="Top Arrow"
      />
    </button>
  );
};

export default BackToTopButton;
