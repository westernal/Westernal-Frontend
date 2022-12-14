import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../../components/layout/header/BackHeader";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import { useEffect } from "react";
import SearchSong from "../../components/posts/search/SearchSong";
import FormLoader from "../../components/layout/loader/FormLoader";
import PostForm from "../../components/authentication/form/PostForm";
import { SearchMusicProvider } from "../../context/searchMusicContext";

const NewPost = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();
  var searchModal;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }
    searchModal = document.getElementById("delete-modal");
  }, [router]);

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
      router.push("/home/timeline");
    } else {
      toast.error(result.data.message);
      SetLoader(false);
    }
  }

  const changeLoader = (loader) => {
    if (loader === "off") {
      SetLoader(false);
    } else if (loader === "on") {
      SetLoader(true);
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    searchModal.style.height = "100%";
  };

  return (
    <>
      <Head>
        <title>Westernal - New Post</title>
      </Head>

      <BackHeader title="New Post" />

      <SearchMusicProvider>
        <SearchSong />
      </SearchMusicProvider>

      <div className="flex add-post">
        <div className="auth-form">
          <p id="login-logo">W</p>

          {loader && <FormLoader />}

          <PostForm
            publish={publish}
            changeLoader={changeLoader}
            openModal={openModal}
          />
        </div>
      </div>

      <div className="mb-100"></div>
      <Footer />
    </>
  );
};

export default NewPost;
