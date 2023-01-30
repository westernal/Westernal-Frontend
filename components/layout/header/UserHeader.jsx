import Link from "next/link";
import Image from "next/image";

const UserHeader = ({ username, isVerified, isLoggedIn, isUserSelf }) => {
  return (
    <header>
      <div className="flex username">
        <h1>{username}</h1>
        {isVerified && (
          <Image
            src="/Images/verified.png"
            alt="verified"
            width={25}
            height={25}
          />
        )}
      </div>
      {!isLoggedIn && (
        <Link href="/">
          <button className="contact-btn">Login</button>
        </Link>
      )}
      {isUserSelf && (
        <div className="flex">
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
      )}
    </header>
  );
};

export default UserHeader;
