import { useRef } from "react";
import AvatarEditor from "react-avatar-editor";

const AvatarCropper = ({ image, setImage }) => {
  const EditorRef = useRef(null);
  const showCroppedImage = async () => {
    if (EditorRef.current) {
      const img = EditorRef.current.getImage().toDataURL();
      console.log(img);
    }
  };
  const closeModal = (e) => {
    e.preventDefault();
    document.getElementById("crop-image").style.display = "none";
  };

  return (
    <div className="pwa">
      <div className="modal" id={`crop-image`}>
        <section className="modal-content flex">
          <div className=" modal-main auth-form">
            <div className="flex install-header">
              <p>Edit image</p>
              <button onClick={closeModal} className="close1">
                &times;
              </button>
            </div>
            <div className="image-cropper flex"></div>
            <div className="flex delete-btns">
              <button
                id="cancel-delete"
                onClick={async (e) => {
                  e.preventDefault();
                  await showCroppedImage();
                }}
              >
                Select
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AvatarCropper;
