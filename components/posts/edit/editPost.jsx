import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../../requests/API";
import EditPostForm from "../../authentication/form/EditPostForm";
import BackHeader from "../../layout/header/BackHeader";
import FormLoader from "../../layout/loader/FormLoader";

const EditPost = ({ post, router }) => {
  const [loader, SetLoader] = useState(false);

  const edit = async (title = "", description = "") => {
    SetLoader(true);

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    };

    try {
      var result = await API(option, `api/posts/edit/${post._id}`);
    } catch (error) {
      toast.error("Server Error! Please try again.");
      SetLoader(false);
      return;
    }

    console.log(result);

    if (result.status == 200) {
      toast.success(`Post edited!!`);
      //   router.push(`/post/${post._id}`);
      SetLoader(false);
    } else {
      toast.error(result.data.message);
      SetLoader(false);
    }
  };
  return (
    <div className="edit-post setting flex">
      <Head>
        <title>Westernal - Edit Post</title>
      </Head>

      <BackHeader title={"Edit Post"} />

      <div className="auth-form">
        {loader && <FormLoader />}
        <EditPostForm post={post} editPost={edit} />
      </div>
    </div>
  );
};

export default EditPost;
