import ContentLoader from "../../components/layout/loader/ContentLoader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Post from "../../components/posts/Post";
import API from "../../requests/API";
import UserInfo from "../../components/user/UserInfo";
import { toast } from "react-toastify";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import decodeJWT from "../../functions/decodeJWT";

const Profile = () => {
  const router = useRouter();
  const [isUserSelf, SetIsUserSelf] = useState(false);
  const [posts, SetPosts] = useState();
  const [user, SetUser] = useState({
    username: "",
    image: "userIcon",
    followers: [],
    followings: [],
    verified: false,
  });
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  async function getUserPosts() {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/posts/user/${router.query.username}`);

    if (result.status == 200) {
      SetPosts(result.data.posts);
      SetUser(result.data.creator);
    } else if (result.status == 404) {
      toast.error("User doesn't exist");
      router.push("/404");
    }
  }

  useEffect(() => {
    if (router.query.username) {
      getUserPosts();
    }

    function checkUser(username) {
      if (username === router.query.username) {
        SetIsUserSelf(true);
      }
    }

    function getToken() {
      var token = localStorage.getItem("token");
      const jwt = decodeJWT(token);

      checkUser(jwt.username);
    }

    if (localStorage.getItem("token")) {
      SetIsLoggedIn(true);
      getToken();
    }
  }, [router.query, router]);

  return (
    <>
      <main className="profile">
        <UserInfo isUserSelf={isUserSelf} user={user} isLoggedIn={isLoggedIn} />
        <section className="flex post-list">
          {!posts &&
            [1, 2, 3].map((index) => {
              return (
                <div className="post" key={index}>
                  <ContentLoader />
                </div>
              );
            })}

          {posts &&
            posts.map((post) => {
              return (
                <Post
                  post={post}
                  onDelete={getUserPosts}
                  key={post._id}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
        </section>
        <BackToTopButton />
      </main>
      {isLoggedIn && <Footer />}
    </>
  );
};

export default Profile;
