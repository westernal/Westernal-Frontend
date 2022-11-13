const EditPostForm = ({ post, editPost }) => {
  const checkInputs = (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    editPost(title, description);
  };
  return (
    <form onSubmit={checkInputs} autoComplete={"off"}>
      <div className="form-inputs">
        <p>Title</p>
        <input
          type="text"
          defaultValue={post && post.title && post.title}
          id="title"
          autoComplete="new-password"
        />
        <p>Description</p>
        <input
          type="text"
          defaultValue={post && post.description && post.description}
          id="description"
        />
      </div>

      <div className="flex setting-btn">
        <button className="btn" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
