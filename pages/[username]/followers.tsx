import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/dist/client/router";
import Users from "../../components/user/Users";
import getRequest from "../../functions/requests/getRequest";
import { User } from "../../interfaces/interface";

const Followers = () => {
  const router: any = useRouter();
  const [followers, SetFollowers] = useState<User[]>();

  async function getFollowers() {
    const result = await getRequest(
      `api/users/followers/${router.query.username}`
    );

    if (result?.status == 200) {
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
      <BackHeader title="Followers" />

      <main className="followers">
        <Users users={followers} />
      </main>
    </>
  );
};

export default Followers;
