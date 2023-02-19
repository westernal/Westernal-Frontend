import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/dist/client/router";
import API from "../../requests/API";
import Users from "../../components/user/Users";
import Head from "next/head";

const Followers = () => {
  const router = useRouter();
  const [followers, SetFollowers] = useState();

  async function getFollowers() {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(
      option,
      `api/users/followers/${router.query.username}`
    );

    if (result.status == 200) {
      SetFollowers(result.data.followers);
    }
  }

  useEffect(() => {
    if (router.query.username) {
      getFollowers();
    }
  }, [router.query, router]);
  return (
    <>
      <Head>
        <title>Westernal - Followers</title>
      </Head>
      <BackHeader title="Followers" />

      <main className="followers">
        <Users users={followers} />
      </main>
    </>
  );
};

export default Followers;
