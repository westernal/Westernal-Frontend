import Link from "next/link";
import DeletePost from "../delete/DeletePost";
import RedirectPost from "../redirect/RedirectPost";
import SavePost from "../save/SavePost";
import SharePost from "../share/SharePost";
import { usePostContext } from "../../../context/postContext";

const PostOptions = ({ onDelete, isLoggedIn, deletable, onUnsave }) => {
  const post = usePostContext();

  const toggleMenu = () => {
    const menu = document.getElementById(post._id);
    menu.classList.toggle("active");
  };

  return (
    <section className="post-options flex">
      <button id="more" className="flex" onClick={toggleMenu}>
        ...
      </button>
      <ul className="post-menu" id={post._id}>
        <SharePost id={post._id} hide={toggleMenu} />
        {isLoggedIn ? (
          <SavePost id={post._id} hide={toggleMenu} onUnsave={onUnsave} />
        ) : null}
        {deletable ? (
          <li>
            <Link href={`/post/edit/${post._id}`}>Edit post</Link>
          </li>
        ) : null}
        <RedirectPost id={post._id} hide={toggleMenu} />
        {deletable ? (
          <DeletePost onDelete={onDelete} id={post._id} hide={toggleMenu} />
        ) : null}
        <li onClick={toggleMenu}>Cancel</li>
      </ul>
    </section>
  );
};

export default PostOptions;
