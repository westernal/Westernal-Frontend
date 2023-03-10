import ContentLoader from "../../components/layout/loader/ContentLoader";
import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Post from "../../components/posts/Post";
import UserInfo from "../../components/user/UserInfo";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";

const Profile = ({ posts, user }) => {
  const [isUserSelf, SetIsUserSelf] = useState(false);
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [userPosts, SetUserPosts] = useState(posts);

  useEffect(() => {
    function checkUser(username) {
      if (username === user.username) {
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
  }, [user]);

  const onDeletePost = (id) => {
    const newPosts = userPosts.filter((post) => {
      return post._id != id;
    });

    SetUserPosts(newPosts);
  };

  return (
    <>
      <main className="profile">
        <UserInfo isUserSelf={isUserSelf} user={user} isLoggedIn={isLoggedIn} />
        <section className="flex post-list">
          {!userPosts
            ? [1, 2, 3].map((index) => {
                return (
                  <div className="post" key={index}>
                    <ContentLoader />
                  </div>
                );
              })
            : null}

          {userPosts?.map((post) => {
            return (
              <Post
                post={post}
                onDelete={onDeletePost}
                key={post._id}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
        </section>
        <BackToTopButton />
      </main>
      {isLoggedIn ? <Footer /> : null}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const username = context.query.username;
  const result = await getRequest(`api/posts/user/${username}`);

  if (result?.status == 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: result.data.posts,
      user: result.data.creator,
    },
  };
};

export default Profile;
