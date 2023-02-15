import Footer from "../../components/layout/Footer";
import { useState, useEffect } from "react";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/router";
import Head from "next/head";
import Logout from "../../components/authentication/Logout";
import SettingForm from "../../components/authentication/form/SettingForm";
import checkPermission from "../../Functions/checkPermission";

const Setting = () => {
  const [image, SetImage] = useState("/Images/userIcon.png");
  const [user, SetUser] = useState();
  const [render, setRender] = useState(false);
  const router = useRouter();
  const host = "https://alinavidi.ir/";

  async function getUserInfo(id) {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/users/${id}`);

    if (result.status == 200) {
      SetUser(result.data.user);
      SetImage(host + result.data.user.image);
    }
  }

  function getToken() {
    var token = localStorage.getItem("token");
    const jwt = jwt_decode(token);

    getUserInfo(jwt.userId);
  }

  useEffect(() => {
    setRender(checkPermission(router, true));
  }, [router.query]);

  useEffect(() => {
    if (render) {
      getToken();
    }
  }, [render]);

  return (
    <>
      <Head>
        <title>Westernal - Setting</title>
      </Head>
      <BackHeader title={"Setting"} />

      <main className="setting flex">
        <section className="auth-form">
          <SettingForm user={user} image={image} />
        </section>

        <div className="setting-btns">
          <a href="mailto:support@contact.westernal.net">
            <button className="contact-btn" type="button">
              Contact Support
            </button>
          </a>

          <Logout />
        </div>
      </main>

      {render && <Footer />}
    </>
  );
};

export default Setting;
