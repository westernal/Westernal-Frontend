import { toast } from "react-toastify";
import { useRouter } from "next/router";
import decodeJWT from "../../../functions/decodeJWT";
import usePostRequest from "../../../hooks/usePostRequest";

const Follow = ({ isFollowing, SetIsFollowing }) => {
  const router = useRouter();

  async function followUser() {
    const jwt = decodeJWT(localStorage.getItem("token"));

    const result = await usePostRequest(
      {
        username: router.query.username,
      },
      `api/users/follow/${jwt.userId}`,
      true
    );

    if (!result) {
      SetLoader(false);
      return;
    }

    if (result.status == 200) {
      toast.success(`You started following ${router.query.username}.`);
      SetIsFollowing(true);
      document.getElementsByClassName("followers-count")[0].innerHTML =
        parseInt(
          document.getElementsByClassName("followers-count")[0].innerHTML
        ) + 1;
    } else {
      toast.error(result.data.message);
    }
  }

  async function unfollowUser() {
    const jwt = decodeJWT(localStorage.getItem("token"));

    const result = await usePostRequest(
      {
        username: router.query.username,
      },
      `api/users/unfollow/${jwt.userId}`,
      true
    );

    if (!result) {
      SetLoader(false);
      return;
    }

    if (result.status == 200) {
      toast.success(`You unfollowed ${router.query.username}.`);
      SetIsFollowing(false);
      document.getElementsByClassName("followers-count")[0].innerHTML =
        document.getElementsByClassName("followers-count")[0].innerHTML - 1;
    } else {
      toast.error(result.data.message);
    }
  }

  return (
    <div className="flex">
      <button
        className={`${isFollowing ? "unfollow-btn" : "follow-btn"}`}
        onClick={!isFollowing ? followUser : unfollowUser}
      >
        {!isFollowing ? <p>Follow</p> : <p>Unfollow</p>}
      </button>
    </div>
  );
};

export default Follow;
