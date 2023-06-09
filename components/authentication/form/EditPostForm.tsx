import { Post } from "../../../interfaces/interface";

const EditPostForm = ({ post, editPost }: { post: Post; editPost: any }) => {
  const getInputValue = (e: any) => {
    e.preventDefault();
    const caption = (document.getElementById("caption") as HTMLInputElement)
      .value;
    editPost(caption);
  };

  return (
    <form onSubmit={getInputValue} autoComplete="off">
      <section className="form-inputs">
        <label htmlFor="caption">Caption</label>
        <input type="text" defaultValue={post?.caption} id="caption" />
      </section>

      <div className="flex setting-btn">
        <button className="btn" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
