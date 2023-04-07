import Image from "next/image";
import { HOST } from "../../../data/data";
import Link from "next/link";

const VerifiedUsers = ({ users }) => {
  return (
    <section className="verified-users flex">
      {users.map((user) => {
        return (
          <Link
            href={`/${user.username}`}
            className="v-user auth-form"
            key={user._id}
          >
            <div className="user-image">
              <Image
                src={HOST + user.image}
                width={80}
                height={80}
                id="avatar"
              />
            </div>
            <div className="user-description">
              <div className="username flex">
                <p className="username">{user.username}</p>
                <Image
                  src="/Images/verified (2).png"
                  alt="verify"
                  width={20}
                  height={20}
                />
              </div>
              <p className="bio">{user?.bio}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default VerifiedUsers;
