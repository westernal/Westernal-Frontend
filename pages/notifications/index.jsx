import Footer from "../../components/layout/Footer";
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const Notifications = () => {
  const [notifs, SetNotifs] = useState([]);
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
        <title>Notifications - Westernal</title>
      </Head>
      <div className="header">
        <p>Notifications</p>
      </div>

      {notifs &&
        notifs.map((notif) => (
          <div className="profile-notif flex" key={notif._id}>
            <div className="notif-main flex gap-5">
              {notif.user && (
                <Link href={`/${notif.user.username}`}>
                  <a>
                    <p id="cm-user">{"@" + notif.user.username}</p>
                  </a>
                </Link>
              )}
              <p>{notif.message}</p>
            </div>
            <p id="date">{dateFormat(notif.date, "mmm d yyyy, HH:MM")}</p>
          </div>
        ))}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Notifications;
