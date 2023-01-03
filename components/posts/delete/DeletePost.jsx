import { useState } from "react";
import DeleteModal from "./DeleteModal";

const DeletePost = ({ onDelete, id, hide }) => {
  const [showModal, SetShowModal] = useState(false);

  const modalDisplay = (e) => {
    const deleteModal = document.getElementById(`delete-modal${id}`);

    hide();

    if (e) {
      e.preventDefault();
    }

    if (showModal) {
      deleteModal.style.height = "0";
      SetShowModal(false);
    } else {
      deleteModal.style.height = "100%";
      SetShowModal(true);
    }
  };

  return (
    <>
      <DeleteModal hide={modalDisplay} id={id} onDelete={onDelete} />

      <a onClick={modalDisplay} href="#" id="delete-link">
        Delete post
      </a>
    </>
  );
};

export default DeletePost;
