import Footer from "../../../components/layout/Footer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../../../components/layout/BackHeader";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

const Setting = () => {
  const [loader, SetLoader] = useState(false);
  const [image, SetImage] = useState("/Images/userIcon.png");
  const [user, SetUser] = useState({
    username: "Username",
    bio: "Bio",
  });
  const router = useRouter();
  const host = "https://alinavidi.ir/";

  function checkInputs() {
    SetLoader(true);
    const password = document.getElementById("password").value;
    const rpassword = document.getElementById("rpassword").value;
    let username = document.getElementById("username");
    let bio = document.getElementById("bio");
    const Image = document.getElementById("image");

    if (bio.value === "") {
      bio.value = bio.placeholder;
    }

    if (username.value === "") {
      username.value = username.placeholder;
    }

    if (password.length < 6 && password.length !== 0) {
      toast.error("Password must be more than 6 characters!");
      SetLoader(false);
    }

    if (password !== rpassword) {
      toast.error("Password must be equal to repeat password!");
      SetLoader(false);
    } else editUser(username.value, password, bio.value, Image.files[0]);
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
      body: newBody,
      redirect: "follow",
    };

    var result = await API(option, `api/users/edit/${user._id}`);

    if (result.status == 200) {
      toast.success(`Information Edited!`);
      router.push(`/profile/${user.username}/${user._id}`);
    } else {
      SetLoader(false);
      toast.error(result.data.message);
    }
  }

  return (
    <>
      <Head>
        <title>Setting - Westernal</title>
      </Head>
      <BackHeader />
      <div className="setting flex">
        <div className="auth-form">
          {loader && (
            <div className="flex">
              <div className="logo-loader flex">
                <p id="loader">w</p>
              </div>
            </div>
          )}
          <div className="form-inputs">
            <div className="flex">
              <Image
                width={50}
                height={50}
                src={image}
                alt="user image"
                id="edit-img"
              />
              <input type="file" id="image" name="image" accept="image/*" />
            </div>
            <input type="text" placeholder={user.username} id="username" />
            <input
              type="text"
              placeholder={user.bio ? user.bio : "Bio"}
              id="bio"
            />
            <input type="text" placeholder="Password" id="password" />
            <input type="text" placeholder="Repeat Password" id="rpassword" />
          </div>

          <div className="flex">
            <button className="btn" onClick={checkInputs}>
              Edit
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Setting;
