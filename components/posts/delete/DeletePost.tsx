import { useState } from "react";
import DeleteModal from "./DeleteModal";

const DeletePost = ({
  onDelete,
  id,
  hide,
}: {
  onDelete: any;
  id: string;
  hide: any;
}) => {
  const [showModal, SetShowModal] = useState<boolean>(false);

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
