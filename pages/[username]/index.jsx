import ContentLoader from "../../components/layout/loader/ContentLoader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Post from "../../components/posts/Post";
import API from "../../requests/API";
import UserInfo from "../../components/user/UserInfo";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

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
      const jwt = jwt_decode(token);

      checkUser(jwt.username);
    }

    if (localStorage.getItem("token")) {
      SetIsLoggedIn(true);
      getToken();
    }
  }, [router.query, router]);

  return (
    <div className="profile">
      <UserInfo isUserSelf={isUserSelf} user={user} isLoggedIn={isLoggedIn} />
      <section className="flex post-list">
        {!posts &&
          [1, 2, 3].map((index) => {
            return (
              <div className="flex" key={index}>
                <div className="post">
                  <ContentLoader />
                </div>
              </div>
            );
          })}

        {posts &&
          posts.map((post) => {
            return (
              <Post
                details={post}
                deletable={isUserSelf}
                onDelete={getUserPosts}
                key={post._id}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
      </section>

      <div className="mb-100"></div>

      {isLoggedIn && <Footer />}
    </div>
  );
};

export default Profile;
