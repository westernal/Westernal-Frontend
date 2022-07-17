import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../../../components/layout/BackHeader";
import Footer from "../../../../components/layout/Footer";
import { useRouter } from "next/dist/client/router";
import API from "../../../../requests/API";
import Link from "next/dist/client/link";

const Followings = () => {
  const router = useRouter();
  const [followings, SetFollowings] = useState([]);
  const host = "http://localhost:5000/";

  useEffect(() => {
    async function getFollowers() {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      var result = await API(option, `api/users/followings/${router.query.id}`);
      console.log(result);

      if (result.status == 200) {
        SetFollowings(result.data.followings);
      }
    }

    if (router.query.id) {
      getFollowers();
    }
  }, [router.query]);
  return (
    <div className="followers">
      <BackHeader title="Followings" />

      <div className="user-list">
        {followings.map((following) => (
          <div className="profile-notif flex" key={following._id}>
            <Link href={`/profile/${following.username}/${following._id}`}>
              <a className="flex">
                <img
                  src={host + following.image}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
                <span id="userId">{following.username} </span>
              </a>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Followings;
