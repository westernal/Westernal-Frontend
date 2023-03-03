import API from "../../../requests/API";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

const SavePost = ({ id, hide, onUnsave }) => {
  const [isSaved, SetIsSaved] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    var token = localStorage.getItem("token");
    const userId = jwtDecode(token).userId;

    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    };

    var result = await API(option, `api/users/${userId}`);

    if (result.status == 200) {
      if (result.data.user.saved_posts.includes(id)) {
        SetIsSaved(true);
      }
    }
  };

  const checkSavePost = () => {
    if (!isSaved) {
      save();
    } else unsave();
  };

  const save = async () => {
    var token = localStorage.getItem("token");
    const userId = jwtDecode(token).userId;

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
      }),
      redirect: "follow",
      mode: "cors",
      credentials: "include",
    };

    var result = await API(option, `api/posts/save/${id}`);

    if (result.status == 200) {
      SetIsSaved(true);
      hide();
      toast.success("Post saved!");
    } else {
      hide();
      toast.error("It seems like there is a problem, please try again!");
    }
  };

  const unsave = async () => {
    var token = localStorage.getItem("token");
    const userId = jwtDecode(token).userId;

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId: userId,
      }),
      redirect: "follow",
    };

    var result = await API(option, `api/posts/unsave/${id}`);

    if (result.status == 200) {
      SetIsSaved(false);
      if (onUnsave) {
        onUnsave();
      }
      hide();
      toast.success("Post unsaved!");
    } else {
      hide();
      toast.error("It seems like there is a problem, please try again!");
    }
  };

  return (
    <li onClick={checkSavePost} id="save-post">
      {isSaved ? "Unsave post" : "Save post"}
    </li>
  );
};

export default SavePost;
