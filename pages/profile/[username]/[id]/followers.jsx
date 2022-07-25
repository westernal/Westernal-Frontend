import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../../../components/layout/BackHeader";
import Footer from "../../../../components/layout/Footer";
import { useRouter } from "next/dist/client/router";
import API from "../../../../requests/API";
import Link from "next/dist/client/link";
import Image from "next/image";
import User from "../../../../components/User/users";

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
        <User users={followers} />
      </div>

      <Footer />
    </div>
  );
};

export default Followers;
