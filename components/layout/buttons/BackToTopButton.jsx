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
      &#10095;
    </button>
  );
};

export default BackToTopButton;
