import { useState } from "react";
import { useEffect } from "react";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

const ReCaptcha = ({ verifyUser, refreshReCaptcha }) => {
  const [theme, SetTheme] = useState("light");
  const key = "6Ldehd0iAAAAALIpW0BqIaAcjd3zBvRe5MyvcryZ";

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
      <GoogleReCaptchaProvider reCaptchaKey={key}>
        <GoogleReCaptcha
          onVerify={verifyUser}
          refreshReCaptcha={refreshReCaptcha}
        />
      </GoogleReCaptchaProvider>
    </div>
  );
};

export default ReCaptcha;
