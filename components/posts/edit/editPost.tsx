import { useState } from "react";
import { toast } from "react-toastify";
import EditPostForm from "../../authentication/form/EditPostForm";
import BackHeader from "../../layout/header/BackHeader";
import FormLoader from "../../layout/loader/FormLoader";
import postRequest from "../../../functions/requests/postRequest";
import { Post } from "../../../interfaces/interface";

const EditPost = ({ post, router }: { post: Post; router: any }) => {
  const [loader, SetLoader] = useState(false);

  const edit = async (caption: string = "") => {
    SetLoader(true);

    const result = await postRequest(
      {
        caption: caption,
      },
      `api/posts/edit/${post._id}`,
      true
    );

    if (!result) {
      SetLoader(false);
      return;
    }

    if (result?.status == 200) {
      toast.success(`Post edited!!`);
      router.push(`/post/${post._id}`);
      SetLoader(false);
    } else {
      toast.error(result.data.message);
      SetLoader(false);
    }
  };
  return (
    <>
      <BackHeader title={"Edit Post"} />
      <main className="edit-post setting flex">
        <section className="auth-form">
          {loader ? <FormLoader /> : null}
          <EditPostForm post={post} editPost={edit} />
        </section>
      </main>
    </>
  );
};

export default EditPost;
