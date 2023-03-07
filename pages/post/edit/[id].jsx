import { useRouter } from "next/router";
import EditPost from "../../../components/posts/edit/editPost";
import { useState, useEffect } from "react";
import checkPermission from "../../../functions/checkPermission";
import getRequest from "../../../functions/requests/getRequest";

const EditPostPage = () => {
  const router = useRouter();
  const [post, SetPost] = useState([]);
  const [render, setRender] = useState(false);

  const getPost = async (id) => {
    const result = await getRequest(`api/posts/${id}`, true);

    if (result?.status == 200) {
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
