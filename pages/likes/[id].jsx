import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import User from "../../components/user/Users";
import BackHeader from "../../components/layout/header/BackHeader";
import Head from "next/head";
import getRequest from "../../functions/requests/getRequest";
import useAuth from "../../hooks/useAuth";

const Likes = () => {
  const router = useRouter();
  const [users, SetUsers] = useState();
  const render = useAuth(true);

  async function getPostLikes(id) {
    const result = await getRequest(`api/posts/like/${router.query.id}`, true);

    if (result?.status == 200) {
      SetUsers(result.data.likes);
    }
  }

  useEffect(() => {
    if (router.query.id && render) {
      getPostLikes();
    }
  }, [router.query, router, render]);

  return (
    <>
      <Head>
        <title>Westernal - Likes</title>
      </Head>
      <BackHeader title={"Likes"} />

      <main className="likes">
        <User users={users} />
      </main>
    </>
  );
};

export default Likes;
