import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../../components/layout/header/BackHeader";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import Icons from "../../components/posts/icons/WebsiteIcons";
import { useEffect } from "react";
import Image from "next/dist/client/image";
import SearchSong from "../../components/posts/search/SearchSong";
import ReactPlayer from "react-player";

const NewPost = () => {
  const [loader, SetLoader] = useState(false);
  var searchModal;
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }

    searchModal = document.getElementById("delete-modal");
  }, [router]);

  const chooseSong = (url) => {
    const song = document.getElementById("song");
    song.value = url;
  };

  const openModal = (e) => {
    e.preventDefault();
    searchModal.style.height = "100%";
  };

  const closeModal = () => {
    searchModal.style.height = "0";
  };

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
      toast.error(result.data.message);
      SetLoader(false);
    }
  }

  function checkInputs(e) {
    e.preventDefault();
    SetLoader(true);
    const song = document.getElementById("song");
    const title = document.getElementById("title");
    const description = document.getElementById("description");

    if (song.value === "") {
      toast.error("song's URL must be included!");
      SetLoader(false);
      return;
    }

    if (
      !ReactPlayer.canPlay(song.value) &&
      !song.value.toLowerCase().includes("spotify")
    ) {
      toast.error("Sorry, we don't support this link.");
      SetLoader(false);
    } else publish(song.value, title.value, description.value);
  }

  return (
    <>
      <Head>
        <title>Westernal - New Post</title>
      </Head>
      <BackHeader title="New Post" />
      <SearchSong hide={closeModal} chooseSong={chooseSong} />
      <div className="flex add-post">
        <div className="auth-form">
          <p id="login-logo">W</p>
          {loader && (
            <div className="flex">
              <div className="logo-loader flex">
                <p id="loader">w</p>
              </div>
            </div>
          )}
          <form onSubmit={checkInputs}>
            <div className="form-inputs" autoComplete="off">
              <Icons />
              <div className="song-url flex">
                <input type="text" id="song" placeholder="Song's URL" />
                OR
                <button className="search-btn" onClick={openModal}>
                  <Image
                    src={"/Images/spotify.svg"}
                    width={25}
                    height={25}
                    alt="spotify"
                  />
                  <p>Search</p>
                </button>
              </div>
              <input type="text" placeholder="Title" id="title" />
              <textarea placeholder="Description" id="description" />
            </div>
            <div className="flex">
              <button className="btn" type="submit">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mb-100"></div>
      <Footer />
    </>
  );
};

export default NewPost;
