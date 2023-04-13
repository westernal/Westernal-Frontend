import { useRef } from "react";

const SharePost = ({ id, hide }: { id: string; hide: any }) => {
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
