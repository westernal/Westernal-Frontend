import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../../../components/layout/Footer";
import Post from "../../../../components/Posts/Post";
import API from "../../../../requests/API";
import UserInfo from "../../../../components/User/userInfo";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const router = useRouter();
  const [isUserSelf, SetIsUserSelf] = useState(false);
  const [posts, SetPosts] = useState();
  const [bgColor, SetBgColor] = useState("#f3f3f3");

  async function getUserPosts(id) {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/posts/user/${router.query.id}`);

    if (result.status == 200) {
      SetPosts(result.data.posts);
    }
  }

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      SetBgColor("#5f5d5d");
    }

    if (router.query.username) {
      getUserPosts(router.query.id);
    }

    function checkUser(userName) {
      if (userName === router.query.username) {
        SetIsUserSelf(true);
      }
    }

    function getToken() {
      var token = localStorage.getItem("token");
      const jwt = jwt_decode(token);

      checkUser(jwt.username);
    }

    getToken();
  }, [router.query]);

  return (
    <div className="profile">
      <UserInfo isUserSelf={isUserSelf} />

      {!posts &&
        [1, 2, 3].map((index) => {
          return (
            <div className="flex" key={index}>
              <div className="post">
                <ContentLoader
                  speed={2}
                  width={"100%"}
                  height={"100%"}
                  viewBox="0 0 320 420"
                  backgroundColor={bgColor}
                  foregroundColor="#ecebeb"
                >
                  <circle cx="25" cy="29" r="11" />
                  <rect x="45" y="25" rx="2" ry="2" width="100" height="10" />
                  <rect x="0" y="54" rx="2" ry="2" width="320" height="276" />
                  <rect x="12" y="345" rx="0" ry="0" width="90" height="12" />
                  <rect x="12" y="365" rx="0" ry="0" width="130" height="10" />
                  <circle cx="20" cy="405" r="9" />
                  <rect x="40" y="397" rx="0" ry="0" width="17" height="17" />
                  <rect x="215" y="400" rx="0" ry="0" width="90" height="12" />
                </ContentLoader>
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
            />
          );
        })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Profile;
