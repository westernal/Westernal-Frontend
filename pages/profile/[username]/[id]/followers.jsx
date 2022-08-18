import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../../../components/layout/BackHeader";
import Footer from "../../../../components/layout/Footer";
import { useRouter } from "next/dist/client/router";
import API from "../../../../requests/API";
import User from "../../../../components/user/users";
import Head from "next/head";
import CheckToken from "../../../../components/authentication/CheckToken";

const Followers = () => {
  const router = useRouter();
  const [followers, SetFollowers] = useState([]);

  CheckToken();

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
      <Head>
        <title>Followers - Westernal</title>
      </Head>
      <BackHeader title="Followers" />

      <div className="user-list">
        <User users={followers} />
      </div>

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Followers;
