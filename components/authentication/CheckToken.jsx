import { useRouter } from "next/router";
import { useEffect } from "react";

const CheckToken = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
};

export default CheckToken;
