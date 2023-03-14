import { toast } from "react-toastify";
import API from "../../../functions/requests/API";

const DeleteModal = ({ id, hide, onDelete }) => {
  const closeModal = (e) => {
    e.preventDefault();
    hide();
  };

  window.onclick = function (event) {
    if (event.target == document.getElementById("delete-modal")) {
      hide();
    }
  };

  async function deletePost(e) {
    e.preventDefault();
    const option = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    };

    var result = await API(option, `api/posts/${id}`);

    if (result.status == 200) {
      toast.success("Post deleted!");
      onDelete(id);
    }
  }

  return (
    <section className="delete-modal" id={`delete-modal${id}`}>
      <div className="modal-text">
        <div onClick={closeModal} className="close">
          &times;
        </div>
        <p>Are you sure you want to delete your post?</p>
        <div className="flex">
          <button id="cancel-delete" onClick={closeModal}>
            Cancel
          </button>
          <button id="confirm-delete" onClick={deletePost}>
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
