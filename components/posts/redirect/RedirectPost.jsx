import Link from "next/link";

const RedirectPost = ({ id, hide }) => {
  return (
    <Link href={`/post/${id}`}>
      <a onClick={hide}>Go to the post</a>
    </Link>
  );
};

export default RedirectPost;
