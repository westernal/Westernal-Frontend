import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import FormLoader from "../../layout/loader/FormLoader";
import API from "../../../requests/API";
import { useRouter } from "next/router";

const SettingForm = ({ user, image }) => {
  const host = "https://alinavidi.ir/";
  const [token, SetToken] = useState("");
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    SetToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (user) {
      const button = document.getElementById("submit-btn");
      button.disabled = false;
    }
  }, [user]);

  const isURL = (link) => {
    let url;

    try {
      url = new URL(link);
    } catch (error) {
      return false;
    }

    return true;
  };

  function checkInputs(e) {
    e.preventDefault();
    SetLoader(true);

    let username = document.getElementById("username");
    let bio = document.getElementById("bio");
    const Image = document.getElementById("image");
    const link = document.getElementById("link");

    if (link.value && !isURL(link.value)) {
      toast.error("Personal link is invalid.");
      SetLoader(false);
      return;
    }

    if (!username.value) {
      toast.error("Please choose a username!");
      return;
    }

    let correctedUsername = username.value.replace(/\s+/g, "");

    editUser(
      correctedUsername.toLowerCase(),
      bio.value,
      Image.files[0],
      link.value.toLowerCase()
    );
  }

  async function editUser(username, bio = "", image, link = "") {
    let newBody = new FormData();
    newBody.append("username", username);
    newBody.append("bio", bio);
    newBody.append("image", image);
    newBody.append("link", link);

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
    <form onSubmit={checkInputs} autoComplete={"off"}>
      <div className="form-inputs">
        <label htmlFor="image">Image</label>
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          defaultValue={user && user.username}
          id="username"
          autoComplete={"off"}
        />
        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          defaultValue={user && user.bio && user.bio}
          id="bio"
          autoComplete={"off"}
        />
        <label htmlFor="link">Personal link</label>
        <input
          type="text"
          defaultValue={user && user.personal_link && user.personal_link}
          id="link"
          autoComplete={"off"}
        />
        <label htmlFor="password">Password</label>
        <Link
          href={`/user/forgot-password/${token}`}
          className="flex change-password"
        >
          <input
            type="button"
            className="search-btn "
            value={" Change password"}
            id="password"
          />
        </Link>
      </div>

      {loader && <FormLoader />}

      <div className="flex setting-btn">
        <button className="btn" disabled type="submit" id="submit-btn">
          Save
        </button>
      </div>
    </form>
  );
};

export default SettingForm;
