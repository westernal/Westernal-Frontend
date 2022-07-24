import Footer from "../../components/layout/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";

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
            <p>{notif.message}</p>
          </div>
        ))}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Notifications;
