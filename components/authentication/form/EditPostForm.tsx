const EditPostForm = ({ post, editPost }) => {
  const checkInputs = (e: any) => {
    e.preventDefault();

    const caption = (document.getElementById("caption") as HTMLInputElement)
      .value;

    editPost(caption);
  };
  return (
    <form onSubmit={checkInputs} autoComplete="off">
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
