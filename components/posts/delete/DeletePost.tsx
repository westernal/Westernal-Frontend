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
    const deleteModal = document.getElementById(
      `delete-modal${id}`
    ) as HTMLDialogElement;
    hide();

    if (showModal) {
      deleteModal.close();
      SetShowModal(false);
    } else {
      deleteModal.showModal();
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
