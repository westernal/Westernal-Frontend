import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import User from "../../components/user/Users";
import BackHeader from "../../components/layout/header/BackHeader";
import getRequest from "../../functions/requests/getRequest";
import { User as UserType } from "../../interfaces/interface";

const Likes = () => {
  const router: any = useRouter();
  const [users, SetUsers] = useState<UserType[]>();

  useEffect(() => {
    async function getPostLikes() {
      const result = await getRequest(
        `api/posts/like/${router.query.id}`,
        true
      );

      if (result?.status == 200) {
        SetUsers(result.data.likes);
      }
    }

    if (router.query.id) {
      getPostLikes();
    }
  }, [router.query, router]);

  return (
    <>
      <BackHeader title={"Likes"} />

      <main className="likes">
        <User users={users} />
      </main>
    </>
  );
};

export default Likes;
