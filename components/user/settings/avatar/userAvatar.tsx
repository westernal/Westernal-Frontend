import Image from "next/image";

const UserAvatar = ({ imageSrc }) => {
  const host = "https://alinavidi.ir/";
  return (
    <>
      <label htmlFor="image">Image</label>
      <div className="flex image-setting">
        <Image
          width={50}
          height={50}
          src={host + imageSrc}
          alt="User avatar"
          id="edit-img"
        />
        <input
          type="file"
          id="image"
          className="file-input"
          name="image"
          accept="image/*"
        />
      </div>
    </>
  );
};

export default UserAvatar;
