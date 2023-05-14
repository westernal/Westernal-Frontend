import { toast } from "react-toastify";
import API from "../../../functions/requests/API";
import { getCookie } from "cookies-next";

const DeleteModal = ({
  id,
  hide,
  onDelete,
}: {
  id: string;
  hide: any;
  onDelete: any;
}) => {
  window.onclick = function (event: any) {
    if (event.target == document.getElementById("delete-modal")) {
      hide();
    }
  };

  async function deletePost(e: any) {
    e.preventDefault();
    const option = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getCookie("cookieToken").toString(),
      },
    };

    var result = await API(option, `api/posts/${id}`);

    if (result.status == 200) {
      toast.success("Post deleted!");
      hide();
      onDelete(id);
    }
  }

  return (
    <dialog className="modal-main auth-form dialog" id={`delete-modal${id}`}>
      <div className="flex install-header">
        <p>Are you sure you want to delete your post?</p>
        <button onClick={hide} className="close1">
          &times;
        </button>
      </div>
      <div className="flex delete-btns">
        <button id="cancel-delete" onClick={hide}>
          Cancel
        </button>
        <button id="confirm-delete" onClick={deletePost}>
          Delete
        </button>
      </div>
    </dialog>
  );
};

export default DeleteModal;
