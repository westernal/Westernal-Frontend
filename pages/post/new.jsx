import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import API from "../../requests/API";
import jwt_decode from "jwt-decode";
import BackHeader from "../../components/layout/header/BackHeader";
import Footer from "../../components/layout/Footer";
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import SearchSong from "../../components/posts/search/SearchSong";
import FormLoader from "../../components/layout/loader/FormLoader";
import PostForm from "../../components/authentication/form/PostForm";
import { SearchMusicProvider } from "../../context/searchMusicContext";
import checkPermission from "../../functions/checkPermission";

const NewPost = () => {
  const [loader, SetLoader] = useState(false);
  const [render, setRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setRender(checkPermission(router));
  }, []);

  function generateToken() {
    var token = localStorage.getItem("token");
    const jwt = jwt_decode(token);
    return jwt;
  }

  async function publish(song, caption) {
    const jwt = generateToken();

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caption: caption,
        authorID: jwt.userId,
        songURL: song,
      }),
      mode: "cors",
      credentials: "include",
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
    const searchModal = document.getElementById("delete-modal");
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

      <main className="flex add-post">
        <div className="auth-form">
          <Image src={"/Images/logo.png"} alt="logo" width={120} height={120} />

          {loader && <FormLoader />}

          <PostForm
            publish={publish}
            changeLoader={changeLoader}
            openModal={openModal}
          />
        </div>
      </main>
      {render && <Footer />}
    </>
  );
};

export default NewPost;
