import { toast } from "react-toastify";
import API from "../../../functions/requests/API";
import { getCookie } from "cookies-next";

const DeleteComment = ({ onDelete, id }) => {
  const deleteComment = async (e) => {
    e.preventDefault();
    const option = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getCookie("cookieToken").toString(),
      },
      mode: "cors",
      credentials: "include",
    };

    var result = await API(option, `api/comments/${id}`);

    if (result.status == 200) {
      toast.success("Comment deleted!");
      onDelete();
    }
  };
  return (
    <a onClick={deleteComment} href="#">
      <svg version="1.1" id="delete-btn" viewBox="0 0 59 59">
        <g>
          <path
            d="M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289
C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h46c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M21.792,2.681
C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681c0.805,0.823,1.128,2.271,1.24,3.319H20.553
C20.665,4.952,20.988,3.504,21.792,2.681z"
          />
          <path
            d="M10.456,54.021C10.493,55.743,11.565,59,15.364,59h28.272c3.799,0,4.871-3.257,4.907-4.958L50.376,10H8.624L10.456,54.021z
M48.291,12l-1.747,41.979C46.538,54.288,46.4,57,43.636,57H15.364c-2.734,0-2.898-2.717-2.909-3.042L10.709,12H48.291z"
          />
          <path d="M17.5,54h24c0.552,0,1-0.447,1-1s-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1S16.948,54,17.5,54z" />
          <path d="M17.5,49h24c0.552,0,1-0.447,1-1s-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1S16.948,49,17.5,49z" />
          <path d="M17.5,44h24c0.552,0,1-0.447,1-1s-0.448-1-1-1h-24c-0.552,0-1,0.447-1,1S16.948,44,17.5,44z" />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </a>
  );
};

export default DeleteComment;
