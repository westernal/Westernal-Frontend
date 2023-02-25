import API from "../../requests/API";
import Footer from "../../components/layout/Footer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import User from "../../components/user/Users";
import BackHeader from "../../components/layout/header/BackHeader";
import Head from "next/head";
import checkPermission from "../../functions/checkPermission";

const Likes = () => {
  const router = useRouter();
  const [users, SetUsers] = useState();
  const [render, setRender] = useState(false);

  async function getPostLikes(id) {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    var result = await API(option, `api/posts/like/${router.query.id}`);

    if (result.status == 200) {
      SetUsers(result.data.likes);
    }
  }

  useEffect(() => {
    setRender(checkPermission(router));
  }, []);

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
