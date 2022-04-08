import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../requests/API";
import jwt_decode from "jwt-decode";

const NewPost = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  function generateToken() {
    var token = localStorage.getItem("token");
    const jwt = jwt_decode(token);
    return jwt;
  }

  async function publish(image, title, description) {
    const jwt = generateToken();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("creator", jwt.userId);
    formData.append("image", image);

    const option = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    };

    var result = await API(option, "api/posts");
    console.log(result);

    if (result.status == 201) {
      toast.success(`Post created!`);
      router.push("/home");
    } else {
      toast.error("Post creation failed!");
      SetLoader(false);
    }
  }

  function checkInputs() {
    SetLoader(true);
    const image = document.getElementById("image");
    const title = document.getElementById("title");
    const description = document.getElementById("description");

    if (title.value === "") {
      toast.error("Title must be included!");
      SetLoader(false);
    }

    if (description.value === "") {
      toast.error("Description must be included!");
      SetLoader(false);
    }

    if (description.value.length < 10) {
      toast.error("Description must be more than 10 characters!");
      SetLoader(false);
    }

    if (image.value === "") {
      toast.error("Image must be included!");
      SetLoader(false);
    } else publish(image.files[0], title.value, description.value);
  }

  return (
    <div className="login flex">
      <div className="auth-form">
        <p id="login-logo">W</p>
        {loader && (
          <div className="flex">
            <div className="logo-loader flex">
              <p id="loader">w</p>
            </div>
          </div>
        )}
        <div className="form-inputs">
          <div className="flex">
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" accept="image/*" />
          </div>
          <input type="text" placeholder="Title" id="title" />
          <textarea placeholder="Description" id="description" />
        </div>
        <div className="flex">
          <button className="btn" onClick={checkInputs}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
