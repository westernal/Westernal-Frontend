import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import Footer from "../../components/layout/Footer";
import { useRouter } from "next/dist/client/router";
import API from "../../requests/API";
import Users from "../../components/user/Users";
import Head from "next/head";
import checkPermission from "../../Functions/checkPermission";

const Followings = () => {
  const router = useRouter();
  const [following, SetFollowing] = useState();

  useEffect(() => {
    checkPermission(router);
  }, []);

  useEffect(() => {
    async function getFollowing() {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      var result = await API(
        option,
        `api/users/following/${router.query.username}`
      );

      if (result.status == 200) {
        SetFollowing(result.data.following);
      }
    }

    if (router.query.username) {
      getFollowing();
    }
  }, [router.query, router]);
  return (
    <>
      <Head>
        <title>Westernal - Following</title>
      </Head>
      <BackHeader title="Following" />

      <main className="followers">
        <Users users={following} />
      </main>

      <Footer />
    </>
  );
};

export default Followings;
