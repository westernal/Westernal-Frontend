import Link from "next/link";
import DeletePost from "../delete/DeletePost";
import RedirectPost from "../redirect/RedirectPost";
import SavePost from "../save/SavePost";
import SharePost from "../share/SharePost";

const PostOptions = ({ onDelete, isLoggedIn, deletable, id, onUnsave }) => {
  const openMenu = (e) => {
    const menu = document.getElementById(id);
    e.preventDefault();
    if (deletable) {
      menu.style.height = "220px";
    } else menu.style.height = "175px";
  };

  const closeMenu = (e) => {
    const menu = document.getElementById(id);
    if (e) {
      e.preventDefault();
    }
    menu.style.height = "0px";
  };

  return (
    <div className="post-options flex">
      <a id="more" className="flex" href="#" onClick={openMenu}>
        ...
      </a>
      <div className="post-menu" id={id}>
        <SharePost id={id} hide={closeMenu} />
        {isLoggedIn && (
          <SavePost id={id} hide={closeMenu} onUnsave={onUnsave} />
        )}
        {isLoggedIn && <Link href={`/post/edit/${id}`}>Edit post</Link>}
        <RedirectPost id={id} hide={closeMenu} />
        {deletable && (
          <DeletePost onDelete={onDelete} id={id} hide={closeMenu} />
        )}
        <a href="#" onClick={closeMenu}>
          Cancel
        </a>
      </div>
    </div>
  );
};

export default PostOptions;
