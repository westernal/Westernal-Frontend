import { useRouter } from "next/router";
import EditPost from "../../../components/posts/edit/editPost";
import { useState, useEffect } from "react";
import getRequest from "../../../functions/requests/getRequest";
import decodeJWT from "../../../functions/decodeJWT";
import Cookies from "js-cookie";

const EditPostPage = () => {
  const router = useRouter();
  const [post, SetPost] = useState([]);

  const getPost = async (id) => {
    const result = await getRequest(`api/posts/${id}`, true);

    if (result?.status == 200) {
      if (
        result.data.post.author.username !=
        decodeJWT(Cookies.get("cookieToken").toString()).username
      ) {
        router.push("/404");
        return;
      }
      SetPost(result.data.post);
    } else router.push("/404");
  };

  useEffect(() => {
    if (router.query.id) {
      getPost(router.query.id);
    }
  }, [router.query]);

  return <EditPost post={post} router={router} />;
};

export default EditPostPage;
