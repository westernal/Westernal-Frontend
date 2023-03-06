import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../../requests/API";
import EditPostForm from "../../authentication/form/EditPostForm";
import BackHeader from "../../layout/header/BackHeader";
import FormLoader from "../../layout/loader/FormLoader";

const EditPost = ({ post, router }) => {
  const [loader, SetLoader] = useState(false);

  const edit = async (caption = "") => {
    SetLoader(true);

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        caption: caption,
      }),
      mode: "cors",
      credentials: "include",
    };

    try {
      var result = await API(option, `api/posts/edit/${post._id}`);
    } catch (error) {
      toast.error("Server Error! Please try again.");
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
