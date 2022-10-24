import { toast } from "react-toastify";

const SharePost = ({ id, hide }) => {
  const copyLink = (e) => {
    e.preventDefault();

    let Link = `https://www.westernal.net/post/${id}`;
    navigator.clipboard.writeText(Link);
    hide();
    toast.success("Link copied!");
  };

  return (
    <a href="#" onClick={copyLink}>
      Copy link
    </a>
  );
};

export default SharePost;
