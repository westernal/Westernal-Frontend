import ContentLoader from "../../components/layout/loader/ContentLoader";
import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Post from "../../components/posts/Post";
import UserInfo from "../../components/user/UserInfo";
import BackToTopButton from "../../components/layout/buttons/BackToTopButton";
import decodeJWT from "../../functions/decodeJWT";
import getRequest from "../../functions/requests/getRequest";
import { getCookie } from "cookies-next";

const Profile = ({ posts, user, isLoggedIn }) => {
  const [isUserSelf, SetIsUserSelf] = useState(false);
  const [userPosts, SetUserPosts] = useState(posts);

  useEffect(() => {
    function checkUser(username) {
      if (username === user?.username) {
        SetIsUserSelf(true);
      }
    }

    function getToken() {
      var token = getCookie("cookieToken").toString();
      const jwt = decodeJWT(token);
      checkUser(jwt.username);
    }

    if (isLoggedIn) {
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
      {isLoggedIn ? <Footer classnames="footer profile" /> : null}
    </>
  );
};

Profile.getInitialProps = async ({ query, req, res }) => {
  const username = query.username;
  const result = await getRequest(`api/posts/user/${username}`);
  let isLoggedIn = false;

  if (getCookie("cookieToken", { req, res })) {
    isLoggedIn = true;
  }

  if (result?.status == 404 || !result) {
    return {
      notFound: true,
    };
  }

  return {
    posts: result.data.posts,
    user: result.data.creator,
    isLoggedIn: isLoggedIn,
  };
};

export default Profile;
