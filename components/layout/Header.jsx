import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          location.reload();
        }}
      >
        westernal
      </a>
      <Link href={"/newpost"}>
        <a aria-label="add" id="add-btn">
          <Image
            src={"/Images/add.svg"}
            width={25}
            height={25}
            alt="add button"
          />
        </a>
      </Link>
    </div>
  );
};

export default Header;
