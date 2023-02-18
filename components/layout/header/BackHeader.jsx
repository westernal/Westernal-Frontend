import { useRouter } from "next/router";
import Image from "next/image";

const BackHeader = ({ title }) => {
  const router = useRouter();
  return (
    <header className="back-header">
      <button
        id="back-link"
        aria-label="back"
        onClick={() => {
          router.back();
        }}
      >
        <Image
          src="/Images/back.svg"
          alt="back button"
          width={20}
          height={30}
        />
      </button>
      <div className="title flex">
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default BackHeader;
