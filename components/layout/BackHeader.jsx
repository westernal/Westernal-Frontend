import { useRouter } from "next/router";

const BackHeader = ({ title }) => {
  const router = useRouter();
  return (
    <div className="header">
      <a href="#" aria-label="add" onClick={() => router.back()}>
        <img src="/Images/icons8-left-arrow-50.png" alt="back button" />
      </a>
      <h1>{title}</h1>
    </div>
  );
};

export default BackHeader;
