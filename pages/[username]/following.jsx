import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../components/layout/BackHeader";
import Footer from "../../components/layout/Footer";
import { useRouter } from "next/dist/client/router";
import API from "../../requests/API";
import User from "../../components/user/Users";
import Head from "next/head";

const Followings = () => {
  const router = useRouter();
  const [following, SetFollowing] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }

    async function getFollowers() {
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

    if (router.query.id) {
      getFollowers();
    }
  }, [router.query, router]);
  return (
    <div className="followers">
      <Head>
        <title>Following - Westernal</title>
      </Head>
      <BackHeader title="Following" />

      <User users={following} />

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Followings;
