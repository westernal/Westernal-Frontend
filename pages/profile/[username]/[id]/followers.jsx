import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../../../components/layout/BackHeader";
import Footer from "../../../../components/layout/Footer";
import { useRouter } from "next/dist/client/router";
import API from "../../../../requests/API";
import Link from "next/dist/client/link";
import Image from "next/image";

const Followers = () => {
  const router = useRouter();
  const [followers, SetFollowers] = useState([]);
  const host = "http://localhost:5000/";

  useEffect(() => {
    async function getFollowers() {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      var result = await API(option, `api/users/followers/${router.query.id}`);

      if (result.status == 200) {
        SetFollowers(result.data.followers);
      }
    }

    if (router.query.id) {
      getFollowers();
    }
  }, [router.query]);
  return (
    <div className="followers">
      <BackHeader title="Followers" />

      <div className="user-list">
        {followers.map((follower) => (
          <div className="profile-notif flex" key={follower._id}>
            <Link href={`/profile/${follower.username}/${follower._id}`}>
              <a className="flex">
                <Image
                  src={host + follower.image}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
                <span id="userId">{follower.username} </span>
              </a>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Followers;
