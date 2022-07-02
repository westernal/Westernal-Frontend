import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../../components/layout/Footer";
import Post from "../../../components/Posts/Post";
import API from "../../../requests/API";
import UserInfo from "../../../components/User/userInfo";

const Profile = () => {
  const router = useRouter();
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
  }, [router.query]);

  return (
    <div className="profile">
      <div className="header">
        <p>{router.query.username}</p>
        <Image
          src="/Images/settings.png"
          alt="setting"
          width={32}
          height={32}
        />
      </div>

      <UserInfo />

      {posts.map((post) => {
        return (
          <div key={post._id}>
            <Post details={post} deletable={true} onDelete={getUserPosts} />
          </div>
        );
      })}

      <div className="mb-100"></div>

      <Footer />
    </div>
  );
};

export default Profile;
