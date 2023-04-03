import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import decodeJWT from "../../../functions/decodeJWT";
import postRequest from "../../../functions/requests/postRequest";
import getRequest from "../../../functions/requests/getRequest";
import Cookies from "js-cookie";

const SavePost = ({ id, hide, onUnsave }) => {
  const [isSaved, SetIsSaved] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    var token = Cookies.get("token");
    const userId = decodeJWT(token).userId;
    const result = await getRequest(`api/users/user/${userId}`);

    if (result?.status == 200) {
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
    var token = Cookies.get("token");
    const userId = decodeJWT(token).userId;

    const result = await postRequest(
      {
        userId: userId,
      },
      `api/posts/save/${id}`,
      true
    );

    if (result.status == 200) {
      SetIsSaved(true);
      hide();
      toast.success("Post saved.");
    } else {
      hide();
      toast.error("It seems like there is a problem, please try again.");
    }
  };

  const unsave = async () => {
    var token = Cookies.get("token");
    const userId = decodeJWT(token).userId;

    const result = await postRequest(
      {
        userId: userId,
      },
      `api/posts/unsave/${id}`,
      true
    );

    if (result.status == 200) {
      SetIsSaved(false);
      if (onUnsave) {
        onUnsave(id);
      }
      hide();
      toast.success("Post unsaved.");
    } else {
      hide();
      toast.error("It seems like there is a problem, please try again.");
    }
  };

  return (
    <li onClick={checkSavePost} id="save-post">
      {isSaved ? "Unsave post" : "Save post"}
    </li>
  );
};

export default SavePost;
