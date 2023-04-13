import Image from "next/image";
import Link from "next/link";

const Header = ({ showLogo = false, title = "" }) => {
  return (
    <header className="header">
      {showLogo ? (
        <>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              location.reload();
            }}
          >
            <h1 id="website-name">westernal</h1>
          </a>
          <Link href={"/post/new"} id="add-btn">
            <Image
              src={"/Images/add.svg"}
              width={25}
              height={25}
              alt="add button"
            />
          </Link>
        </>
      ) : (
        <h1 className="notification-header">{title}</h1>
      )}
    </header>
  );
};

export default Header;
