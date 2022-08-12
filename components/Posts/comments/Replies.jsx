import Reply from "./Reply";

const Replies = ({ replies, onDelete }) => {
  return (
    <>
      {replies.map((reply) => {
        return <Reply reply={reply} onDelete={onDelete} key={reply._id} />;
      })}
    </>
  );
};

export default Replies;
