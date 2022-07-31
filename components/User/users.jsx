import Link from "next/link";
import Image from "next/image";
import ContentLoader from "react-content-loader";
import { useState } from "react";
import { useEffect } from "react";

const User = ({ users }) => {
  const host = "https://alinavidi.ir/";
  const [loader, SetLoader] = useState(true);

  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function loaderpreview(params) {
      await sleep(500);
      SetLoader(false);
    }
    loaderpreview();
  }, []);

  return (
    <div className="user-list">
      {loader && (
        <div className="flex">
          <ContentLoader
            speed={2}
            width={"80%"}
            height={"100%"}
            viewBox="0 0 400 150"
            backgroundColor="#f3f3f3"
            foregroundColor="#9d38fc"
          >
            <circle cx="10" cy="20" r="8" />
            <rect x="25" y="15" rx="5" ry="5" width="80%" height="10" />
            <circle cx="10" cy="50" r="8" />
            <rect x="25" y="45" rx="5" ry="5" width="80%" height="10" />
            <circle cx="10" cy="80" r="8" />
            <rect x="25" y="75" rx="5" ry="5" width="80%" height="10" />
            <circle cx="10" cy="110" r="8" />
            <rect x="25" y="105" rx="5" ry="5" width="80%" height="10" />
          </ContentLoader>
        </div>
      )}
      {!loader &&
        users.map((user) => (
          <div className="profile-notif flex" key={user._id}>
            <Link href={`/profile/${user.username}/${user._id}`}>
              <a className="flex">
                <Image
                  src={host + user.image}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
                <span id="userId">{user.username} </span>
                {user.verified && (
                  <Image
                    src="/Images/verified 2.png"
                    alt="verify"
                    width={25}
                    height={25}
                    id="verify"
                  />
                )}
              </a>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default User;
