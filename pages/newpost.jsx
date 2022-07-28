import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../components/layout/BackHeader";
import Footer from "../components/layout/Footer";

const NewPost = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  function generateToken() {
    var token = localStorage.getItem("token");
    const jwt = jwt_decode(token);
    return jwt;
  }

  async function publish(song, title, description) {
    const jwt = generateToken();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("creator", jwt.userId);
    formData.append("song", song);

    const option = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    };

    try {
      var result = await API(option, "api/posts");
    } catch (error) {
      toast.error("Server error! please try again.");
    }

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
    const song = document.getElementById("song");
    const title = document.getElementById("title");
    const description = document.getElementById("description");

    if (song.value === "") {
      toast.error("song must be included!");
      SetLoader(false);
    } else publish(song.files[0], title.value, description.value);
  }

  return (
    <>
      <BackHeader title="New Post" />
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
              <label htmlFor="song">song:</label>
              <input
                type="file"
                id="song"
                name="song"
                accept="audio/* .mp3 .mkv .wav"
              />
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
      <Footer />
    </>
  );
};

export default NewPost;
