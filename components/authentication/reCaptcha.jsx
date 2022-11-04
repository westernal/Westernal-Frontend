import { useState } from "react";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ ref }) => {
  const [theme, SetTheme] = useState("light");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      SetTheme("dark");
    }
  }, []);

  return (
    <div className="recaptcha flex">
      <ReCAPTCHA
        sitekey="6Ldehd0iAAAAALIpW0BqIaAcjd3zBvRe5MyvcryZ"
        theme={theme}
        ref={ref}
      />
    </div>
  );
};

export default ReCaptcha;
