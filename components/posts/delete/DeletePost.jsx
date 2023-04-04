import { useState } from "react";
import DeleteModal from "./DeleteModal";

const DeletePost = ({ onDelete, id, hide }) => {
  const [showModal, SetShowModal] = useState(false);

  const modalDisplay = () => {
    const deleteModal = document.getElementById(`delete-modal${id}`);

    hide();

    if (showModal) {
      deleteModal.style.display = "none";
      SetShowModal(false);
    } else {
      deleteModal.style.display = "block";
      SetShowModal(true);
    }
  };

  return (
    <>
      <DeleteModal hide={modalDisplay} id={id} onDelete={onDelete} />

      <li onClick={modalDisplay} id="delete-link">
        Delete post
      </li>
    </>
  );
};

export default DeletePost;
