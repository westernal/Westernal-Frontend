import { useRouter } from "next/router";
import EditPost from "../../../components/posts/edit/editPost";
import { useState, useEffect } from "react";
import API from "../../../requests/API";

const EditPostPage = () => {
  const router = useRouter();
  const [post, SetPost] = useState([]);

  const getPost = async (id) => {
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/posts/${id}`);

    if (result.status == 200) {
      SetPost(result.data.post);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getPost(router.query.id);
    }
  }, [router.query]);

  return (
    <div className="edit-post">
      <EditPost post={post} router={router} />
    </div>
  );
};

export default EditPostPage;
