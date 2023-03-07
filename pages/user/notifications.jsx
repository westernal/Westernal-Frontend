import Footer from "../../components/layout/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import NotifLoader from "../../components/layout/loader/NotifLoader";
import formatDate from "../../functions/formatDate";
import Image from "next/image";
import Header from "../../components/layout/header/Header";
import checkPermission from "../../functions/checkPermission";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";

const Notifications = () => {
  const [notifs, SetNotifs] = useState();
  const [render, setRender] = useState(false);
  const router = useRouter();
  const host = "https://alinavidi.ir/";

  async function getNotifications() {
    let id = decodeJWT(localStorage.getItem("token")).userId;
    const result = await getRequest(`api/notifications/${id}`, true);

    if (result.status == 200) {
      SetNotifs(result.data.notifications);
    }
  }

  useEffect(() => {
    setRender(checkPermission(router));
  }, []);

  useEffect(() => {
    if (render) {
      getNotifications();
    }
  }, [render]);

  return (
    <>
      <Head>
        <title>Westernal - Notifications</title>
      </Head>
      <Header title={"Notifications"} />
      <main className="notification">
        <section className="notif-list">
          {!notifs
            ? [1, 2, 3, 4, 5, 6, 7].map((elem, index) => {
                return (
                  <div className="profile-notif flex" key={index}>
                    <NotifLoader />
                  </div>
                );
              })
            : null}

          {notifs?.map((notif) => (
            <div className="profile-notif flex" key={notif._id}>
              <div className="flex notif-main ">
                <Link href={`/${notif.user.username}`} className="flex">
                  <Image
                    src={
                      !notif.user.image.includes("userIcon")
                        ? host + notif.user.image
                        : "/Images/user.svg"
                    }
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
      {render ? <Footer /> : null}
    </>
  );
};

export default Notifications;
