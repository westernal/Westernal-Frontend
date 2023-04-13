import { Comment } from "../../../../interfaces/interface";
import Reply from "./Reply";

const Replies = ({
  replies,
  onDelete,
}: {
  replies: Comment[];
  onDelete: any;
}) => {
  return (
    <section>
      {replies.map((reply) => {
        return <Reply reply={reply} onDelete={onDelete} key={reply._id} />;
      })}
    </section>
  );
};

export default Replies;
