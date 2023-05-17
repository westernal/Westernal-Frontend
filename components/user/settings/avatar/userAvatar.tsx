import Image from "next/image";
import { HOST } from "../../../../data/data";

const UserAvatar = ({ imageSrc }) => {
  return (
    <>
      <label htmlFor="image">Image</label>
      <div className="flex image-setting">
        <Image
          width={50}
          height={50}
          src={HOST + imageSrc}
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
