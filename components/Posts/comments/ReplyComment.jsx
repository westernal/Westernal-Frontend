import Image from "next/image";

const ReplyComment = () => {
  const reply = (e) => {
    e.preventDefault();
  };

  return (
    <a href="#" onClick={reply}>
      <Image
        src="/Images/reply.svg"
        width={25}
        height={25}
        alt="reply"
        id="reply-button"
      />
    </a>
  );
};

export default ReplyComment;
