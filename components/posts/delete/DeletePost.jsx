import { useState } from "react";
import DeleteModal from "./DeleteModal";

const DeletePost = ({ onDelete, id, hide }) => {
  const [showModal, SetShowModal] = useState(false);

  const modalDisplay = (e) => {
    hide();
    if (e) {
      e.preventDefault();
    }
    if (showModal) {
      SetShowModal(false);
    } else SetShowModal(true);
  };

  return (
    <>
      {showModal && (
        <DeleteModal hide={modalDisplay} id={id} onDelete={onDelete} />
      )}

      <a onClick={modalDisplay} href="#" id="delete-link">
        Delete post
      </a>
    </>
  );
};

export default DeletePost;
