import API from "../../requests/API";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import User from "../../components/User/users";
import BackHeader from "../../components/layout/BackHeader";
import Head from "next/head";

const Likes = () => {
  const router = useRouter();
  const [users, SetUsers] = useState([]);

  useEffect(() => {
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

    if (router.query.id) {
      getPostLikes();
    }
  }, [router.query]);

  return (
    <div className="likes">
      <Head>
        <title>Likes - Westernal</title>
      </Head>
      <BackHeader title={"Likes"} />

      <User users={users} />

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Likes;
