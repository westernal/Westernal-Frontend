const EditPostForm = ({ post, editPost }) => {
  const checkInputs = (e) => {
    e.preventDefault();

    const caption = document.getElementById("caption").value;

    editPost(caption);
  };
  return (
    <form onSubmit={checkInputs} autoComplete={"off"}>
      <div className="form-inputs">
        <label htmlFor="caption">Caption</label>
        <input
          type="text"
          defaultValue={post && post.caption && post.caption}
          id="caption"
          autoComplete={"off"}
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
