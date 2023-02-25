import { useRef } from "react";
import { toast } from "react-toastify";

const SharePost = ({ id, hide }) => {
  const Link = useRef({
    text: "Post",
    title: "See this post on Westernal.",
    url: `https://www.westernal.net/post/${id}`,
  });

  const share = async () => {
    await navigator.share(Link.current);
    hide();
  };

  return <li onClick={share}>Share post</li>;
};

export default SharePost;
