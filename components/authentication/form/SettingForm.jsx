import Image from "next/image";
import { toast } from "react-toastify";

const SettingForm = ({ user, editUser, changeLoader, image }) => {
  const host = "https://alinavidi.ir/";

  function checkInputs(e) {
    e.preventDefault();
    changeLoader("on");

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
      changeLoader("off");
    }

    if (password !== confirmPassword) {
      toast.error("Password must be equal to repeat password!");
      changeLoader("off");
    } else
      editUser(
        correctedUsername.toLowerCase(),
        password,
        bio.value,
        Image.files[0]
      );
  }

  return (
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
          autoComplete="new-password"
        />
        <input type="text" placeholder={"Bio"} id="bio" />
        <input
          type="password"
          placeholder="New password"
          id="changePassword"
          autoComplete="new-password"
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
  );
};

export default SettingForm;
