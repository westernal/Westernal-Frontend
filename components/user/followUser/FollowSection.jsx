import API from "../../../requests/API";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import decodeJWT from "../../../functions/decodeJWT";

const Follow = ({ isFollowing, SetIsFollowing }) => {
  const router = useRouter();

  async function followUser() {
    const jwt = decodeJWT(localStorage.getItem("token"));

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: router.query.username,
      }),
      redirect: "follow",
      credentials: "include",
    };

    var result = await API(option, `api/users/follow/${jwt.userId}`);

    if (result.status == 200) {
      toast.success(`You started following ${router.query.username}`);
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

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: router.query.username,
      }),
      redirect: "follow",
      mode: "cors",
      credentials: "include",
    };

    var result = await API(option, `api/users/unfollow/${jwt.userId}`);

    if (result.status == 200) {
      toast.success(`You unfollowed ${router.query.username}`);
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
