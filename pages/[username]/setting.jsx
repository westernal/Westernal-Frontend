import Footer from "../../components/layout/Footer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/router";
import Head from "next/head";
import Logout from "../../components/authentication/Logout";
import FormLoader from "../../components/layout/loader/FormLoader";
import SettingForm from "../../components/authentication/form/SettingForm";

const Setting = () => {
  const [loader, SetLoader] = useState(false);
  const [image, SetImage] = useState("/Images/userIcon.png");
  const [user, SetUser] = useState({
    username: "Username",
    bio: "Bio",
  });
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }

    function getToken() {
      var token = localStorage.getItem("token");
      const jwt = jwt_decode(token);

      getUserInfo(jwt.userId);
    }

    getToken();
  }, []);

  const changeLoader = (loader) => {
    if (loader === "off") {
      SetLoader(false);
    } else if (loader === "on") {
      SetLoader(true);
    }
  };

  async function editUser(username, password, bio, image) {
    let newBody = new FormData();
    newBody.append("username", username);
    newBody.append("bio", bio);
    newBody.append("image", image);
    if (password.length !== 0) {
      newBody.append("password", password);
    }

    const option = {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      body: newBody,
      redirect: "follow",
    };

    var result = await API(option, `api/users/edit/${user._id}`);

    if (result.status == 200) {
      toast.success(`Information Edited!`);
      localStorage.setItem("token", result.data.token);
      router.push(`/${username}`);
    } else {
      SetLoader(false);
      toast.error(result.data.message);
    }
  }

  return (
    <>
      <Head>
        <title>Westernal - Setting</title>
      </Head>
      <BackHeader title={"Setting"} />
      <div className="setting flex">
        <section>
          <div className="auth-form">
            {loader && <FormLoader />}

            <SettingForm
              user={user}
              editUser={editUser}
              changeLoader={changeLoader}
              image={image}
            />
          </div>

          <div className="setting-btns">
            <a href="mailto:support@contact.westernal.net">
              <button className="contact-btn" type="button">
                Contact Support
              </button>
            </a>

            <Logout />
          </div>

          <div className="mb-100"></div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Setting;
