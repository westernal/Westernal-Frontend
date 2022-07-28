import { useRouter } from "next/router";
import Image from "next/image";

const BackHeader = ({ title }) => {
  const router = useRouter();
  return (
    <div className="header back-header">
      <a href="#" aria-label="add" onClick={() => router.back()}>
        <Image
          src="/Images/icons8-left-arrow-50.png"
          alt="back button"
          width={50}
          height={50}
        />
      </a>
      <h1>{title}</h1>
    </div>
  );
};

export default BackHeader;
