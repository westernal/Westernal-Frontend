import { useRouter } from "next/router";
import EditPost from "../../../components/posts/edit/editPost";
import { useState, useEffect } from "react";
import getRequest from "../../../functions/requests/getRequest";
import decodeJWT from "../../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import { Post } from "../../../interfaces/interface";

const EditPostPage = () => {
  const router: any = useRouter();
  const [post, SetPost] = useState<Post>();

  useEffect(() => {
    const getPost = async (id: string) => {
      const result = await getRequest(`api/posts/${id}`, true);

      if (result?.status == 200) {
        if (
          result.data.post.author.username !=
          decodeJWT(getCookie("cookieToken").toString()).username
        ) {
          router.push("/404");
          return;
        }
        SetPost(result.data.post);
      } else router.push("/404");
    };

    if (router.query.id) {
      getPost(router.query.id);
    }
  }, [router.query, router]);

  return <EditPost post={post} router={router} />;
};

export default EditPostPage;
