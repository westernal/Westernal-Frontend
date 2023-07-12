import { useState } from "react";
import { useEffect } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/dist/client/router";
import Users from "../../components/user/Users";
import getRequest from "../../functions/requests/getRequest";
import { User } from "../../interfaces/interface";

const Followings = () => {
  const router: any = useRouter();
  const [following, SetFollowing] = useState<User[]>();

  useEffect(() => {
    const getFollowing = async (isMounted: boolean) => {
      const result = await getRequest(
        `api/users/following/${router.query.username}`
      );

      if (result?.status == 200) {
        if (isMounted) SetFollowing(result.data.following);
      }
    };

    let isMounted = true;

    if (router.query.username) {
      getFollowing(isMounted);
    }
    return () => {
      isMounted = false;
    };
  }, [router.query, router]);
  return (
    <>
      <BackHeader title="Following" />

      <main className="followings">
        <Users users={following} />
      </main>
    </>
  );
};

export default Followings;
