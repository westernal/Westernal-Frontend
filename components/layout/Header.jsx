import Link from "next/link";

const Header = () => {
  return (
    <div className="header">
      <p>westernal</p>
      <Link href={"/newpost"}>
        <a href="#" aria-label="add" id="add-btn">
          +
        </a>
      </Link>
    </div>
  );
};

export default Header;
