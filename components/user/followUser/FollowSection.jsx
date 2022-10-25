import Link from "next/link";

const FollowSection = ({ user }) => {
  return (
    <div className="follow-section flex">
      <div className="followers">
        <p className="follow-name">Followers</p>
        <Link href={`/${user.username}/followers`}>
          <p className="followers-count flw-num">{user.followers.length}</p>
        </Link>
      </div>
      <div className="followers">
        <p className="follow-name">Following</p>
        <Link href={`/${user.username}/following`}>
          <p className="flw-num">{user.followings.length}</p>
        </Link>
      </div>
    </div>
  );
};

export default FollowSection;
