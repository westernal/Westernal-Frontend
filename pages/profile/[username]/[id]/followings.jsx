import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../../../components/layout/BackHeader";
import Footer from "../../../../components/layout/Footer";
import { useRouter } from "next/dist/client/router";
import API from "../../../../requests/API";
import User from "../../../../components/User/users";

const Followings = () => {
  const router = useRouter();
  const [followings, SetFollowings] = useState([]);

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

      <User users={followings} />

      <Footer />
    </div>
  );
};

export default Followings;