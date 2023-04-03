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

export default function Index({ userId }) {
  const { data: result, isLoading } = useSWR(
    `api/posts/timeline/${userId}`,
    (url) => getRequest(url, true)
  );

  const onDeletePost = (id) => {
    const newPosts = result.data.posts.filter((post) => {
      return post._id != id;
    });

    SetPosts(newPosts);
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

          {result?.data?.posts?.map((post) => {
            return <Post post={post} key={post._id} onDelete={onDeletePost} />;
          })}
        </section>
        <BackToTopButton />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const userId = decodeJWT(
    getCookie("cookieToken", { req, res }).toString()
  ).userId;

  return {
    props: { userId: userId },
  };
};
