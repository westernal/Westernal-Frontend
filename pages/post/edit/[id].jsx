import { useRouter } from "next/router";
import EditPost from "../../../components/posts/edit/editPost";
import { useState, useEffect } from "react";
import API from "../../../requests/API";
import checkPermission from "../../../functions/checkPermission";

const EditPostPage = () => {
  const router = useRouter();
  const [post, SetPost] = useState([]);
  const [render, setRender] = useState(false);

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
    } else router.push("/404");
  };

  useEffect(() => {
    setRender(checkPermission(router));
  }, []);

  useEffect(() => {
    if (router.query.id && render) {
      getPost(router.query.id);
    }
  }, [router.query, render]);

  return <EditPost post={post} router={router} />;
};

export default EditPostPage;
