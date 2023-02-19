import { useState } from "react";
import DeleteModal from "./DeleteModal";

const DeletePost = ({ onDelete, id, hide }) => {
  const [showModal, SetShowModal] = useState(false);

  const modalDisplay = () => {
    const deleteModal = document.getElementById(`delete-modal${id}`);

    hide();

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

      <li onClick={modalDisplay} id="delete-link">
        Delete post
      </li>
    </>
  );
};

export default DeletePost;
