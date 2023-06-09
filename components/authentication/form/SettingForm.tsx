import UserAvatar from "../../user/settings/avatar/userAvatar";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import FormLoader from "../../layout/loader/FormLoader";
import API from "../../../functions/requests/API";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

const SettingForm = ({ user }) => {
  const [token, SetToken] = useState("");
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    SetToken(getCookie("cookieToken").toString());
  }, []);

  useEffect(() => {
    if (user) {
      const button = document.getElementById("submit-btn") as HTMLButtonElement;
      button.disabled = false;
    }
  }, [user]);

  const isURL = (link: string) => {
    let url: URL;

    try {
      url = new URL(link);
    } catch (error) {
      return false;
    }

    return true;
  };

  const getInputsValues = (e: any) => {
    e.preventDefault();
    SetLoader(true);
    let username = document.getElementById("username") as HTMLInputElement;
    let bio = document.getElementById("bio") as HTMLInputElement;
    const image = document.getElementById("image") as HTMLInputElement;
    const link = document.getElementById("link") as HTMLInputElement;
    checkInputs(username, bio, image, link);
  };

  const checkInputs = (
    username: HTMLInputElement,
    bio: HTMLInputElement,
    image: HTMLInputElement,
    link: HTMLInputElement
  ) => {
    if (!isURL(link?.value)) {
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
      image.files[0],
      link.value.toLowerCase()
    );
  };

  async function editUser(
    username: string,
    bio: string = "",
    image: File,
    link: string = ""
  ) {
    let newBody = new FormData();
    newBody.append("username", username);
    newBody.append("bio", bio);
    newBody.append("image", image);
    newBody.append("link", link);

    const option = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getCookie("cookieToken").toString(),
      },
      body: newBody,
      redirect: "follow",
      mode: "cors",
      credentials: "include",
    };

    var result = await API(option, `api/users/edit/${user._id}`);

    if (result.status == 200) {
      toast.success(`Information Edited!`);
      setCookie("cookieToken", result.data.token, {
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365),
      });
      router.push(`/${username}`);
    } else {
      SetLoader(false);
      toast.error(result.data.message);
    }
  }

  return (
    <form onSubmit={getInputsValues} autoComplete="off">
      <section className="form-inputs">
        <UserAvatar imageSrc={user.image} />
        <label htmlFor="username">Username</label>
        <input type="text" defaultValue={user?.username} id="username" />
        <label htmlFor="bio">Bio</label>
        <input type="text" defaultValue={user?.bio} id="bio" />
        <label htmlFor="link">Personal link</label>
        <input type="text" defaultValue={user?.personal_link} id="link" />
        <label htmlFor="password">Password</label>
        <Link
          href={`/user/forgot-password/${token}`}
          className="flex change-password"
        >
          <button className="search-btn" id="password">
            Change password
          </button>
        </Link>
      </section>

      {loader ? <FormLoader /> : null}

      <div className="flex setting-btn">
        <button className="btn" disabled type="submit" id="submit-btn">
          Save
        </button>
      </div>
    </form>
  );
};

export default SettingForm;
