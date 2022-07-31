import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../components/layout/BackHeader";
import Footer from "../components/layout/Footer";
import Head from "next/head";

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

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        creator: jwt.userId,
        song: song,
      }),
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
    } else publish(song.value, title.value, description.value);
  }

  return (
    <>
      <Head>
        <title>New Post - Westernal</title>
      </Head>
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
            <input type="text" id="song" placeholder="Song URL" />
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
