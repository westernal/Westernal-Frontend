import { toast } from "react-toastify";
import API from "../../../requests/API";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

const DeleteModal = ({ id, hide, onDelete }) => {
  useEffect(() => {
    const deleteModal = document.getElementById("delete-modal");
    deleteModal.style.height = "100%";
  }, []);

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
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    var result = await API(option, `api/posts/${id}`);

    if (result.status == 200) {
      toast.success("Post deleted!");
      var token = localStorage.getItem("token");
      const jwt = jwt_decode(token);
      onDelete(jwt);
    }
  }

  return (
    <div className="delete-modal" id="delete-modal">
      <div className="modal-text">
        <a href="#" onClick={closeModal} className="close">
          &times;
        </a>
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
    </div>
  );
};

export default DeleteModal;
