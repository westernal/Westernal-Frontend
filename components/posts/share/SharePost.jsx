import { toast } from "react-toastify";

const SharePost = ({ id, hide }) => {
  const copyLink = () => {
    let Link = `https://www.westernal.net/post/${id}`;
    navigator.clipboard.writeText(Link);
    hide();
    toast.success("Link copied!");
  };

  return <li onClick={copyLink}>Copy link</li>;
};

export default SharePost;
