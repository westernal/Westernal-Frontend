import Link from "next/link";
import Image from "next/image";

const UserHeader = ({
  username,
  isVerified,
  isLoggedIn,
  isUserSelf,
}: {
  username: string;
  isVerified: boolean;
  isLoggedIn: boolean;
  isUserSelf: boolean;
}) => {
  return (
    <header>
      <div className="flex username">
        <h1>{username}</h1>
        {isVerified ? (
          <Image
            src="/Images/verified.png"
            alt="verified"
            width={25}
            height={25}
          />
        ) : null}
      </div>
      {!isLoggedIn ? (
        <Link href="/">
          <button className="contact-btn">Login</button>
        </Link>
      ) : null}
      {isUserSelf && username ? (
        <div className="flex header-buttons" data-testid="header-buttons">
          <Link href={`/${username}/saved`} className="flex" id="saved-posts">
            <Image
              src="/Images/save.svg"
              alt="saved posts"
              width={30}
              height={30}
            />
          </Link>

          <Link href={`/${username}/setting`} className="flex">
            <Image
              src="/Images/setting.svg"
              alt="setting"
              width={40}
              height={40}
            />
          </Link>
        </div>
      ) : null}
    </header>
  );
};

export default UserHeader;
