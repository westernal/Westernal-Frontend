import Footer from "../../components/layout/Footer";
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import NotifLoader from "../../components/layout/loader/NotifLoader";

const Notifications = () => {
  const [notifs, SetNotifs] = useState();
  const router = useRouter();

  async function getNotifications() {
    let id = jwt_decode(localStorage.getItem("token")).userId;
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/notifications/${id}`);

    if (result.status == 200) {
      SetNotifs(result.data.notifications);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }

    getNotifications();
  }, [router]);

  return (
    <div className="notification">
      <Head>
        <title>Westernal - Notifications</title>
      </Head>
      <div className="header">
        <p>Notifications</p>
      </div>

      <div className="notif-list">
        {!notifs &&
          [1, 2, 3, 4, 5, 6, 7].map((elem, index) => {
            return (
              <div className="profile-notif flex" key={index}>
                <NotifLoader />
              </div>
            );
          })}

        {notifs &&
          notifs.map((notif) => (
            <div className="profile-notif flex" key={notif._id}>
              <div className="notif-main">
                {notif.user && (
                  <p>
                    <Link href={`/${notif.user.username}`}>
                      <a>
                        <span id="cm-user">{"@" + notif.user.username} </span>
                      </a>
                    </Link>
                    <span>{notif.message}</span>
                  </p>
                )}
              </div>
              <p id="date">{dateFormat(notif.date, "mmm d yyyy, HH:MM")}</p>
            </div>
          ))}
      </div>

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Notifications;
