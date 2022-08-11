import Link from "next/link";

const FollowSection = ({ user }) => {
  return (
    <div className="follow-section flex">
      <div className="followers">
        <p className="follow-name">Followers</p>
        <Link href={`/profile/${user.username}/${user._id}/followers`}>
          <a>
            <p className="followers-count flw-num">{user.followers.length}</p>
          </a>
        </Link>
      </div>
      <div className="followers">
        <p className="follow-name">Following</p>
        <Link href={`/profile/${user.username}/${user._id}/followings`}>
          <a>
            <p className="flw-num">{user.followings.length}</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FollowSection;
