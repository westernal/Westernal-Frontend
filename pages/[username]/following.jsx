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
  const [render, setRender] = useState(false);

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
    setRender(checkPermission(router));
  }, []);

  useEffect(() => {
    if (router.query.username && render) {
      getFollowing();
    }
  }, [router.query, router, render]);
  return (
    <>
      <Head>
        <title>Westernal - Following</title>
      </Head>
      <BackHeader title="Following" />

      <main className="followers">
        <Users users={following} />
      </main>

      {render && <Footer />}
    </>
  );
};

export default Followings;
