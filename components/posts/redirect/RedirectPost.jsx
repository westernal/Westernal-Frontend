import { useRouter } from "next/router";

const RedirectPost = ({ id, hide }) => {
  const router = useRouter();

  const handleRedirect = () => {
    hide();
    router.push(`/post/${id}`);
  };
  return <li onClick={handleRedirect}>Go to the post</li>;
};

export default RedirectPost;
