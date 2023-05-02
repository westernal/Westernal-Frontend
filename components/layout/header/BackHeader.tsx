import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

const BackHeader = ({
  title,
  head = true,
}: {
  title: string;
  head?: boolean;
}) => {
  const router = useRouter();
  return (
    <header className="back-header">
      {head ? (
        <Head>
          <title>Westernal - {title}</title>
        </Head>
      ) : null}
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
          height={20}
        />
      </button>
      <div className="title flex">
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default BackHeader;
