import LikePost from "../like/LikePost";
import Link from "next/link";

const PostIcons = ({ post }) => {
  return (
    <section className="post-icons flex">
      <LikePost
        id={post._id}
        likesCount={post.likes.length}
        postLikes={post.likes}
      />
      <Link href={`/comments/${post._id}`} id="comments" className="flex gap-5">
        <svg viewBox="0 0 24 24">
          <g id="Icons" stroke="none" fill="none">
            <g id="Rounded" transform="translate(-680.000000, -2060.000000)">
              <g id="Editor" transform="translate(100.000000, 1960.000000)">
                <g
                  id="-Round-/-Editor-/-mode_comment"
                  transform="translate(578.000000, 98.000000)"
                >
                  <g transform="translate(0.000000, 0.000000)">
                    <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                    <path
                      d="M22,4 C22,2.9 21.1,2 20,2 L4,2 C2.9,2 2,2.9 2,4 L2,16 C2,17.1 2.9,18 4,18 L18,18 L22,22 L22,4 Z"
                      id="🔹-Icon-Color"
                      fill="black"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>

        <p id="like-count">{post.comments_length}</p>
      </Link>
    </section>
  );
};

export default PostIcons;
