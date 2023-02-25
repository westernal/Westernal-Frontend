import { useRef } from "react";
import { toast } from "react-toastify";

const SharePost = ({ id, hide }) => {
  const Link = useRef({
    text: "Post",
    title: "See this post on Westernal.",
    url: `https://www.westernal.net/post/${id}`,
  });

  const copyLink = () => {
    navigator.clipboard.writeText(Link.current.url);
    hide();
    toast.success("Link copied!");
  };

  const share = async () => {
    await navigator.share(Link.current);
    hide();
  };

  return (
    <>
      <li onClick={share}>Share post</li>
      <li onClick={copyLink}>Copy link</li>
    </>
  );
};

export default SharePost;
