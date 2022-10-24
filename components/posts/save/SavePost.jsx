import API from "../../../requests/API";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";

const SavePost = ({ id, hide }) => {
  let userId;
  const [isSaved, SetIsSaved] = useState(false);

  useEffect(() => {
    var token = localStorage.getItem("token");
    userId = jwtDecode(token).userId;

    checkUser();
  }, []);

  const checkUser = async () => {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/users/${userId}`);

    if (result.status == 200) {
      if (result.data.user.saved_posts.includes(id)) {
        SetIsSaved(true);
      }
    }
  };

  const checkSavePost = (e) => {
    e.preventDefault();

    if (!isSaved) {
      save();
    } else unsave();
  };

  const save = async () => {
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
      hide();
      toast.success("Post unsaved!");
    } else {
      hide();
      toast.error("It seems like there is a problem, please try again!");
    }
  };

  return (
    <a href="#" onClick={checkSavePost}>
      {isSaved ? "Unsave post" : "Save post"}
    </a>
  );
};

export default SavePost;
