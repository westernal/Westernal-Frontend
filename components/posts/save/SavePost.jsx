import API from "../../../requests/API";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SavePost = ({ id }) => {
  let userId;

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
        document.getElementById(id).classList.add("saved");
      }
    }
  };

  const checkSavePost = (e) => {
    e.preventDefault();

    if (!document.getElementById(id).classList.contains("saved")) {
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
      document.getElementById(id).classList.add("saved");
      toast.success("Post saved!");
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
      document.getElementById(id).classList.remove("saved");
      toast.success("Post unsaved!");
    }
  };

  return (
    <a href="#" onClick={checkSavePost}>
      <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        fill="none"
        className="save-svg"
      >
        <path
          d="M106.813 490.7C100.678 490.687 94.6168 489.36 89.037 486.809C81.5376 483.47 75.1749 478.016 70.7279 471.115C66.281 464.215 63.9429 456.167 64 447.958V85.333C64.0186 68.3648 70.7674 52.097 82.7657 40.0986C94.764 28.1003 111.032 21.3515 128 21.333H384C400.968 21.3515 417.236 28.1003 429.234 40.0986C441.233 52.097 447.982 68.3648 448 85.333V447.958C448 456.155 445.639 464.178 441.2 471.068C436.76 477.958 430.43 483.424 422.966 486.811C415.502 490.199 407.221 491.365 399.112 490.17C391.003 488.975 383.409 485.47 377.24 480.073L256 373.99L134.76 480.073C127.049 486.899 117.112 490.678 106.813 490.7V490.7ZM256 331.359C266.333 331.341 276.32 335.081 284.1 341.88L405.333 447.958L405.474 448.067L405.333 85.333C405.328 79.6769 403.078 74.2539 399.079 70.2544C395.079 66.2549 389.656 64.0056 384 64H128C122.344 64.0056 116.921 66.2549 112.921 70.2544C108.922 74.2539 106.673 79.6769 106.667 85.333V447.958L227.907 341.875C235.684 335.076 245.67 331.338 256 331.359V331.359Z"
          fill="#ffffff"
          className={"save-icon"}
          id={id}
        ></path>
      </svg>
    </a>
  );
};

export default SavePost;
