import Link from "next/link";
import Image from "next/image";
import UserLoader from "../layout/loader/UserContentLoader";
import { User } from "../../interfaces/interface";

const User = ({ users }: { users: User[] }) => {
  const host = "https://alinavidi.ir/";

  return (
    <section className="user-list">
      {!users
        ? [1, 2, 3, 4, 5, 6, 7].map((elem, index) => {
            return (
              <div className="user profile-notif flex" key={index}>
                <UserLoader />
              </div>
            );
          })
        : null}
      {users?.map((user) => (
        <Link
          href={`/${user.username}`}
          className="user flex profile-notif"
          key={user._id}
        >
          <div className="flex user-info">
            <Image
              src={host + user.image}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
              alt="user avatar"
            />

            <strong id="userId">{user.username} </strong>
            {user.verified ? (
              <div className="verify">
                <Image
                  src="/Images/verified (2).png"
                  alt="verify"
                  width={20}
                  height={20}
                />
              </div>
            ) : null}
          </div>
        </Link>
      ))}
    </section>
  );
};

export default User;
