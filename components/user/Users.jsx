import Link from "next/link";
import Image from "next/image";
import UserLoader from "../layout/loader/UserContentLoader";

const User = ({ users }) => {
  const host = "https://alinavidi.ir/";

  return (
    <section className="user-list">
      {!users &&
        [1, 2, 3, 4, 5, 6, 7].map((elem, index) => {
          return (
            <div className="profile-notif flex" key={index}>
              <UserLoader />
            </div>
          );
        })}
      {users &&
        users.map((user) => (
          <div className="profile-notif flex" key={user._id}>
            <Link href={`/${user.username}`} className="flex">
              {
                <Image
                  src={
                    !user.image.includes("userIcon")
                      ? host + user.image
                      : "/Images/user.svg"
                  }
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                  alt="user avatar"
                />
              }
              <span id="userId">{user.username} </span>
              {user.verified && (
                <div className="verify">
                  <Image
                    src="/Images/verified (2).png"
                    alt="verify"
                    width={20}
                    height={20}
                  />
                </div>
              )}
            </Link>
          </div>
        ))}
    </section>
  );
};

export default User;
