import Link from "next/link";
import DeletePost from "../delete/DeletePost";
import RedirectPost from "../redirect/RedirectPost";
import SavePost from "../save/SavePost";
import SharePost from "../share/SharePost";
import { usePostContext } from "../../../context/postContext";

const PostOptions = ({ onDelete, isLoggedIn, deletable, onUnsave }) => {
  const post = usePostContext();

  const openMenu = () => {
    const menu = document.getElementById(post._id);
    menu.style.maxHeight = "600px";
  };

  const closeMenu = () => {
    const menu = document.getElementById(post._id);
    menu.style.maxHeight = "0px";
  };

  return (
    <section className="post-options flex">
      <button id="more" className="flex" onClick={openMenu}>
        ...
      </button>
      <ul className="post-menu" id={post._id}>
        <SharePost id={post._id} hide={closeMenu} />
        {isLoggedIn ? (
          <SavePost id={post._id} hide={closeMenu} onUnsave={onUnsave} />
        ) : null}
        {deletable ? (
          <li>
            <Link href={`/post/edit/${post._id}`}>Edit post</Link>
          </li>
        ) : null}
        <RedirectPost id={post._id} hide={closeMenu} />
        {deletable ? (
          <DeletePost onDelete={onDelete} id={post._id} hide={closeMenu} />
        ) : null}
        <li onClick={closeMenu}>Cancel</li>
      </ul>
    </section>
  );
};

export default PostOptions;
