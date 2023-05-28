import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import BackHeader from "../../components/layout/header/BackHeader";
import Footer from "../../components/layout/Footer";
import Image from "next/image";
import FormLoader from "../../components/layout/loader/FormLoader";
import PostForm from "../../components/authentication/form/PostForm";
import { SearchMusicProvider } from "../../context/searchMusicContext";
import decodeJWT from "../../functions/decodeJWT";
import postRequest from "../../functions/requests/postRequest";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
const SearchSong = dynamic(
  () => import("../../components/posts/search/SearchSong")
);

const NewPost = () => {
  const [loader, SetLoader] = useState(false);
  const router = useRouter();

  const publish = async (song: string, caption: string) => {
    const jwt = decodeJWT(getCookie("cookieToken").toString());

    const result = await postRequest(
      {
        caption: caption,
        authorID: jwt.userId,
        songURL: song,
      },
      "api/posts",
      true
    );

    if (!result) {
      SetLoader(false);
      return;
    }

    if (result?.status == 201) {
      toast.success(`Post created!`);
      router.push("/home/timeline");
    } else {
      toast.error(result?.data?.message);
      SetLoader(false);
    }
  };

  const changeLoader = (loader: string) => {
    if (loader === "off") {
      SetLoader(false);
    } else if (loader === "on") {
      SetLoader(true);
    }
  };

  return (
    <SearchMusicProvider>
      <BackHeader title="New Post" />

      <SearchSong />
      <main className="flex add-post">
        <div className="auth-form">
          <Image src={"/Images/logo.png"} alt="logo" width={120} height={120} />

          {loader ? <FormLoader /> : null}

          <PostForm publish={publish} changeLoader={changeLoader} />
        </div>
      </main>
      <Footer />
    </SearchMusicProvider>
  );
};

export default NewPost;
