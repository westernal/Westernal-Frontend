const PostError = () => {
  return (
    <div className="post-error flex">
      <div className="error-icon">&times;</div>
      <p id="error-text">Sorry, looks like there is a problem.</p>
      <p id="error-reason">
        either you don{"'"}t have access or the link itself is not a media that
        we support!
      </p>
    </div>
  );
};

export default PostError;
