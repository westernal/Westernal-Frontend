import { useRouter } from "next/router";
import Image from "next/image";

const BackHeader = ({ title }) => {
  const router = useRouter();
  return (
    <div className="header back-header">
      <a
        href="#"
        aria-label="add"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        <Image
          src="/Images/back.svg"
          alt="back button"
          width={30}
          height={30}
        />
      </a>
      <h1>{title}</h1>
    </div>
  );
};

export default BackHeader;
