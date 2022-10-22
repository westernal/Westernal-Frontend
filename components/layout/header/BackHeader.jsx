import { useRouter } from "next/router";
import Image from "next/image";

const BackHeader = ({ title, returnHome = false }) => {
  const router = useRouter();
  return (
    <div className="header back-header">
      <a
        href="#"
        id="back-link"
        aria-label="add"
        onClick={(e) => {
          e.preventDefault();
          if (!returnHome) {
            router.back();
          } else router.push("/");
        }}
      >
        <Image
          src="/Images/back.svg"
          alt="back button"
          width={20}
          height={20}
        />
      </a>
      <div className="flex">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default BackHeader;
