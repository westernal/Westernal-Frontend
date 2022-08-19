import Link from "next/link";

const FollowSection = ({ user }) => {
  return (
    <div className="follow-section flex">
      <div className="followers">
        <p className="follow-name">Followers</p>
        <Link href={`/${user.username}/followers`}>
          <a>
            <p className="followers-count flw-num">{user.followers.length}</p>
          </a>
        </Link>
      </div>
      <div className="followers">
        <p className="follow-name">Following</p>
        <Link href={`/${user.username}/following`}>
          <a>
            <p className="flw-num">{user.followings.length}</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FollowSection;
