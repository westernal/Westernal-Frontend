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
  const closeModal = (e?: any) => {
    e?.preventDefault();
    hide();
  };

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
      closeModal();
      onDelete(id);
    }
  }

  return (
    <div className="pwa">
      <div className="modal" id={`delete-modal${id}`}>
        <section className="modal-content flex">
          <div className=" modal-main auth-form">
            <div className="flex install-header">
              <p>Are you sure you want to delete your post?</p>
              <button onClick={closeModal} className="close1">
                &times;
              </button>
            </div>
            <div className="flex delete-btns">
              <button id="cancel-delete" onClick={closeModal}>
                Cancel
              </button>
              <button id="confirm-delete" onClick={deletePost}>
                Delete
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeleteModal;
