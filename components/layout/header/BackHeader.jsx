import { useRouter } from "next/router";
import Image from "next/image";

const BackHeader = ({ title }) => {
  const router = useRouter();
  return (
    <div className="header back-header">
      <a
        href="#"
        id="back-link"
        aria-label="add"
        onClick={(e) => {
          e.preventDefault();
          router.back();
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
