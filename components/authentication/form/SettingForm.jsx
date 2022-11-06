import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const SettingForm = ({ user, editUser, changeLoader, image }) => {
  const host = "https://alinavidi.ir/";
  const [token, SetToken] = useState("");

  useEffect(() => {
    SetToken(localStorage.getItem("token"));
  }, []);

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
    changeLoader("on");

    let username = document.getElementById("changeUsername");
    let bio = document.getElementById("bio");
    const Image = document.getElementById("image");
    const link = document.getElementById("link");

    if (link.value && !isURL(link.value)) {
      toast.error("Personal link is invalid.");
      changeLoader("off");
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

  return (
    <form onSubmit={checkInputs} autoComplete={"off"}>
      <div className="form-inputs">
        <p>Image</p>
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
        <p>Username</p>
        <input
          type="text"
          defaultValue={user && user.username}
          id="changeUsername"
          autoComplete="new-password"
        />
        <p>Bio</p>
        <input
          type="text"
          defaultValue={user && user.bio && user.bio}
          id="bio"
        />
        <p>Personal link</p>
        <input
          type="text"
          defaultValue={user && user.personal_link && user.personal_link}
          id="link"
        />
      </div>

      <div className="flex setting-btn">
        <Link href={`/user/forgot-password/${token}`}>
          {" "}
          <button className="search-btn ">Change password</button>
        </Link>
        <button className="btn" type="submit">
          Edit
        </button>
      </div>
    </form>
  );
};

export default SettingForm;
