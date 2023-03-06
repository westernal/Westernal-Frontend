import Link from "next/link";
import DeletePost from "../delete/DeletePost";
import RedirectPost from "../redirect/RedirectPost";
import SavePost from "../save/SavePost";
import SharePost from "../share/SharePost";

const PostOptions = ({ onDelete, isLoggedIn, deletable, id, onUnsave }) => {
  const openMenu = () => {
    const menu = document.getElementById(id);
    menu.style.maxHeight = "600px";
  };

  const closeMenu = () => {
    const menu = document.getElementById(id);
    menu.style.maxHeight = "0px";
  };

  return (
    <section className="post-options flex">
      <button id="more" className="flex" onClick={openMenu}>
        ...
      </button>
      <ul className="post-menu" id={id}>
        <SharePost id={id} hide={closeMenu} />
        {isLoggedIn ? (
          <SavePost id={id} hide={closeMenu} onUnsave={onUnsave} />
        ) : null}
        {deletable ? (
          <li>
            <Link href={`/post/edit/${id}`}>Edit post</Link>
          </li>
        ) : null}
        <RedirectPost id={id} hide={closeMenu} />
        {deletable ? (
          <DeletePost onDelete={onDelete} id={id} hide={closeMenu} />
        ) : null}
        <li onClick={closeMenu}>Cancel</li>
      </ul>
    </section>
  );
};

export default PostOptions;
