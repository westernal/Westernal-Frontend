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

const Timeline = ({ userId }) => {
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
      <Footer classnames="footer home" />
    </>
  );
};

Timeline.getInitialProps = async ({ req, res }) => {
  const userId = decodeJWT(
    getCookie("cookieToken", { req, res }).toString()
  ).userId;

  return {
    userId: userId,
  };
};

export default Timeline;
