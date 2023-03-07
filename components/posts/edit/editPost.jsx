import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../../requests/API";
import EditPostForm from "../../authentication/form/EditPostForm";
import BackHeader from "../../layout/header/BackHeader";
import FormLoader from "../../layout/loader/FormLoader";
import usePostRequest from "../../../hooks/usePostRequest";

const EditPost = ({ post, router }) => {
  const [loader, SetLoader] = useState(false);

  const edit = async (caption = "") => {
    SetLoader(true);

    const result = await usePostRequest(
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

    if (result.status == 200) {
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
      <Head>
        <title>Westernal - Edit Post</title>
      </Head>

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
