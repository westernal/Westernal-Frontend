const User = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div className="profile-notif flex" key={user._id}>
          <Link href={`/profile/${user.username}/${user._id}`}>
            <a className="flex">
              <Image
                src={host + user.image}
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />
              <span id="userId">{user.username} </span>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default User;
