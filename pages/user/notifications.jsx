import Footer from "../../components/layout/Footer";
import Link from "next/link";
import Head from "next/head";
import NotifLoader from "../../components/layout/loader/NotifLoader";
import formatDate from "../../functions/formatDate";
import Image from "next/image";
import Header from "../../components/layout/header/Header";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";
import { getCookie } from "cookies-next";
import useSWR from "swr";

const Notifications = ({ id }) => {
  const {
    data: result,
    isLoading,
    error,
  } = useSWR(`api/notifications/${id}`, (url) => getRequest(url, true));
  const host = "https://alinavidi.ir/";

  return (
    <>
      <Head>
        <title>Westernal - Notifications</title>
      </Head>
      <Header title={"Notifications"} />
      <main className="notification">
        <section className="notif-list">
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7].map((elem, index) => {
                return (
                  <div className="profile-notif flex" key={index}>
                    <NotifLoader />
                  </div>
                );
              })
            : null}

          {!isLoading &&
            !error &&
            result.data.notifications.map((notif) => (
              <div className="profile-notif flex" key={notif._id}>
                <div className="flex notif-main ">
                  <Link href={`/${notif.user.username}`} className="flex">
                    <Image
                      src={host + notif.user.image}
                      alt="user avatar"
                      id="avatar"
                      width={40}
                      height={40}
                    />

                    <strong id="cm-user">{notif.user.username} </strong>
                    {notif.user.verified ? (
                      <div className="verify">
                        <Image
                          src="/Images/verified (2).png"
                          alt="verify"
                          width={20}
                          height={20}
                        />
                      </div>
                    ) : null}
                  </Link>
                  <span>{notif.message}</span>
                </div>

                <div className="flex notif-info">
                  <p id="date">{formatDate(notif.date)}</p>
                  {notif.postId ? (
                    <Link href={`/post/${notif.postId}`}>
                      <button className="choose-song btn">View post</button>
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const userId = decodeJWT(
    getCookie("cookieToken", { req, res }).toString()
  ).userId;

  return {
    props: { id: userId },
  };
};

export default Notifications;
