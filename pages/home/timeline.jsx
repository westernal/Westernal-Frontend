import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/header/Header";
import Post from "../../components/posts/Post";
import Head from "next/head";
import ContentLoader from "../../components/layout/loader/ContentLoader";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import { mutate } from "swr";
import { useEffect, useState } from "react";

export default function Index() {
  const [userId, SetUserId] = useState("");
  const {
    data: result,
    isLoading,
    error,
  } = useSWR(
    () => `api/posts/timeline/${userId}`,
    (url) => getRequest(url, true)
  );

  const onDeletePost = (id) => {
    mutate(`api/posts/timeline/${userId}`);
  };

  useEffect(() => {
    SetUserId(decodeJWT(getCookie("cookieToken").toString()).userId);
  }, []);

  return (
    <>
      <Header showLogo={true} />
      <Head>
        <title>Westernal: Let the songs talk</title>
      </Head>
      <main className="home">
        <section className="post-list flex">
          {isLoading
            ? [1, 2, 3].map((elem, index) => {
                return (
                  <div className="post" key={index}>
                    <ContentLoader />
                  </div>
                );
              })
            : null}

          {!isLoading &&
            !error &&
            result?.data?.posts?.map((post) => {
              return (
                <Post post={post} key={post._id} onDelete={onDeletePost} />
              );
            })}
        </section>
        <BackToTopButton />
      </main>
      <Footer />
    </>
  );
}
