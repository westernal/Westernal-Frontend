import Image from "next/image";

const ReplyComment = () => {
  const reply = (e) => {
    e.preventDefault();
  };

  return (
    <a href="#" onClick={reply} id="reply-a">
      <Image
        src="/Images/reply.svg"
        width={23}
        height={23}
        alt="reply"
        id="reply-button"
      />
    </a>
  );
};

export default ReplyComment;
