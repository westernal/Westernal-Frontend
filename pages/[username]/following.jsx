import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/dist/client/router";
import API from "../../requests/API";
import Users from "../../components/user/Users";
import Head from "next/head";

const Followings = () => {
  const router = useRouter();
  const [following, SetFollowing] = useState();

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

  useEffect(() => {
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

      <main className="followings">
        <Users users={following} />
      </main>
    </>
  );
};

export default Followings;
