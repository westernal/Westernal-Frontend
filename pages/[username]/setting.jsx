import Footer from "../../components/layout/Footer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Logout from "../../components/authentication/Logout";

const Setting = () => {
  const [loader, SetLoader] = useState(false);
  const [image, SetImage] = useState("/Images/userIcon.png");
  const [user, SetUser] = useState({
    username: "Username",
    bio: "Bio",
  });
  const router = useRouter();
  const host = "https://alinavidi.ir/";

  function checkInputs(e) {
    e.preventDefault();
    SetLoader(true);
    const password = document.getElementById("changePassword").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    let username = document.getElementById("changeUsername");
    let bio = document.getElementById("bio");
    const Image = document.getElementById("image");

    if (!bio.value) {
      bio.value = user.bio;
    }

    if (!username.value) {
      username.value = user.username;
    }

    let correctedUsername = username.value.replace(/\s+/g, "");

    if (password.length < 6 && password.length !== 0) {
      toast.error("Password must be more than 6 characters!");
      SetLoader(false);
    }

    if (password !== confirmPassword) {
      toast.error("Password must be equal to repeat password!");
      SetLoader(false);
    } else
      editUser(
        correctedUsername.toLowerCase(),
        password,
        bio.value,
        Image.files[0]
      );
  }

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
            {loader && (
              <div className="flex">
                <div className="logo-loader flex">
                  <p id="loader">w</p>
                </div>
              </div>
            )}

            <form onSubmit={checkInputs} autoComplete={"off"}>
              <div className="form-inputs">
                <div className="flex image-setting">
                  <Image
                    width={50}
                    height={50}
                    src={
                      !image.includes("userIcon")
                        ? host + user.image
                        : "/Images/user.svg"
                    }
                    alt="user image"
                    id="edit-img"
                  />
                  <input
                    type="file"
                    id="image"
                    className="file-input"
                    name="image"
                    accept="image/*"
                  />
                </div>
                <input
                  type="text"
                  placeholder={"Username"}
                  id="changeUsername"
                  autoComplete="off"
                />
                <input type="text" placeholder={"Bio"} id="bio" />
                <input
                  type="password"
                  placeholder="New password"
                  id="changePassword"
                  autoComplete="off"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirm-password"
                  autoComplete="off"
                />
              </div>

              <div className="flex setting-btn">
                <button className="btn" type="submit">
                  Edit
                </button>
              </div>
            </form>
          </div>

          <div className="setting-btns">
            <a href="mailto:support@contact.westernal.net">
              <button className="contact-btn">Contact Support</button>
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
