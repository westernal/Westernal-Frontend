import Image from "next/image";
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
  const [posts, SetPosts] = useState([
    {
      title: "",
      description: "",
      image: "",
      creator: "",
      date: "",
      _id: 0,
      likes: [],
    },
  ]);

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

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <Post
              details={post}
              deletable={isUserSelf}
              onDelete={getUserPosts}
            />
          </div>
        );
      })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Profile;
