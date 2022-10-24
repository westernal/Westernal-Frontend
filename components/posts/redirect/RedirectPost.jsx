import { useRouter } from "next/router";

const RedirectPost = ({ id, hide }) => {
  const router = useRouter();

  const handleRedirect = (e) => {
    e.preventDefault();
    hide();
    router.push(`/post/${id}`);
  };
  return (
    <a onClick={handleRedirect} href="#">
      Go to the post
    </a>
  );
};

export default RedirectPost;
