import Footer from "../../components/layout/Footer";
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import Link from "next/link";

const Notifications = () => {
  const [notifs, SetNotifs] = useState([]);

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
    getNotifications();
  }, []);

  return (
    <div className="notification">
      <div className="header">
        <p>Notifications</p>
      </div>

      {notifs &&
        notifs.map((notif) => (
          <div className="profile-notif flex" key={notif._id}>
            <div className="notif-main flex">
              {notif.user && (
                <Link href={`/profile/${notif.user.username}/${notif.user.id}`}>
                  <a>
                    <p id="cm-user">{"@" + notif.user.username}</p>
                  </a>
                </Link>
              )}
              <p>{notif.message}</p>
            </div>
            <p id="date">{dateFormat(notif.date, "mmm d, yyyy")}</p>
          </div>
        ))}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Notifications;
