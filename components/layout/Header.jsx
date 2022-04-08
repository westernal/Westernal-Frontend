import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <p>westernal</p>
      <Link href={"/newpost"}>
        <a href="#" aria-label="add">
          +
        </a>
      </Link>
    </div>
  );
};

export default Header;
