import API from "../../../requests/API";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Follow = ({ isFollowing, SetIsFollowing }) => {
  const router = useRouter();

  async function followUser() {
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
    };

    var result = await API(
      option,
      `api/users/follow/${jwt_decode(localStorage.getItem("token")).userId}`
    );

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
    };

    var result = await API(
      option,
      `api/users/unfollow/${jwt_decode(localStorage.getItem("token")).userId}`
    );

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
        className="follow-btn"
        onClick={!isFollowing ? followUser : unfollowUser}
      >
        {!isFollowing ? <p>Follow</p> : <p>Unfollow</p>}
      </button>
    </div>
  );
};

export default Follow;
