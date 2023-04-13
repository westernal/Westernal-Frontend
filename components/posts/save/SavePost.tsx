import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import decodeJWT from "../../../functions/decodeJWT";
import postRequest from "../../../functions/requests/postRequest";
import { getCookie } from "cookies-next";

const SavePost = ({
  id,
  hide,
  onUnsave,
}: {
  id: string;
  hide: any;
  onUnsave: any;
}) => {
  const [isSaved, SetIsSaved] = useState<boolean>(false);

  const checkUser = async () => {
    var token = getCookie("cookieToken").toString();
    const userId = decodeJWT(token).userId;
    const result = await postRequest(
      {
        postId: id,
      },
      `api/users/saved-posts/${userId}`,
      true
    );

    if (result?.status == 200) {
      SetIsSaved(result.data.isSaved);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const checkSavePost = () => {
    if (!isSaved) {
      save();
    } else unsave();
  };

  const save = async () => {
    var token = getCookie("cookieToken").toString();
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
    var token = getCookie("cookieToken").toString();
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
