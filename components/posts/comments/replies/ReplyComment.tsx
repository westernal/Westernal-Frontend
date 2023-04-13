const ReplyComment = ({ onReply, id }) => {
  const reply = (e: any) => {
    e.preventDefault();
    onReply(id);
  };

  return (
    <a href="#" onClick={reply} id="reply-cm">
      <svg id="i-reply" viewBox="0 0 32 32" fill="none" stroke="#5f5d5d">
        <path d="M10 6 L3 14 10 22 M3 14 L18 14 C26 14 30 18 30 26" />
      </svg>
    </a>
  );
};

export default ReplyComment;
