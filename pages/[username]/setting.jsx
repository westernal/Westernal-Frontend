import Footer from "../../components/layout/Footer";
import { useState, useEffect } from "react";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/router";
import Head from "next/head";
import Logout from "../../components/authentication/Logout";
import SettingForm from "../../components/authentication/form/SettingForm";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";
import useAuth from "../../hooks/useAuth";

const Setting = () => {
  const [image, SetImage] = useState("/Images/userIcon.png");
  const [user, SetUser] = useState();
  const router = useRouter();
  const render = useAuth(router, true);
  const host = "https://alinavidi.ir/";

  async function getUserInfo(id) {
    const result = await getRequest(`api/users/${id}`);

    if (result?.status == 200) {
      SetUser(result.data.user);
      SetImage(host + result.data.user.image);
    }
  }

  function getToken() {
    var token = localStorage.getItem("token");
    const jwt = decodeJWT(token);

    getUserInfo(jwt.userId);
  }

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
            <button className="contact-btn">Contact Support</button>
          </a>
          <Logout />
        </div>
      </main>

      {render ? <Footer /> : null}
    </>
  );
};

export default Setting;
