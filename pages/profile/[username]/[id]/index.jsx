import ContentLoader from "../../../../components/layout/ContentLoader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../../../components/layout/Footer";
import Post from "../../../../components/posts/Post";
import API from "../../../../requests/API";
import UserInfo from "../../../../components/user/userInfo";
import jwt_decode from "jwt-decode";
import CheckToken from "../../../../components/authentication/CheckToken";

const Profile = () => {
  const router = useRouter();
  const [isUserSelf, SetIsUserSelf] = useState(false);
  const [posts, SetPosts] = useState();

  CheckToken();

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
            />
          );
        })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Profile;
