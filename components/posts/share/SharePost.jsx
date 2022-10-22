import { toast } from "react-toastify";

const SharePost = (id) => {
  const copyLink = () => {
    let Link = `https://www.westernal.net/post/${id.id}`;
    navigator.clipboard.writeText(Link);
    toast.success("Link copied!");
  };

  return (
    <a href="#" onClick={copyLink}>
      <svg width="18px" height="20px" viewBox="0 0 18 20" version="1.1">
        <g id="Icons" stroke="none" fill="none">
          <g id="Rounded" transform="translate(-817.000000, -4100.000000)">
            <g id="Social" transform="translate(100.000000, 4044.000000)">
              <g
                id="-Round-/-Social-/-share"
                transform="translate(714.000000, 54.000000)"
              >
                <g>
                  <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                  <path
                    d="M18,16.08 C17.24,16.08 16.56,16.38 16.04,16.85 L8.91,12.7 C8.96,12.47 9,12.24 9,12 C9,11.76 8.96,11.53 8.91,11.3 L15.96,7.19 C16.5,7.69 17.21,8 18,8 C19.66,8 21,6.66 21,5 C21,3.34 19.66,2 18,2 C16.34,2 15,3.34 15,5 C15,5.24 15.04,5.47 15.09,5.7 L8.04,9.81 C7.5,9.31 6.79,9 6,9 C4.34,9 3,10.34 3,12 C3,13.66 4.34,15 6,15 C6.79,15 7.5,14.69 8.04,14.19 L15.16,18.35 C15.11,18.56 15.08,18.78 15.08,19 C15.08,20.61 16.39,21.92 18,21.92 C19.61,21.92 20.92,20.61 20.92,19 C20.92,17.39 19.61,16.08 18,16.08 Z"
                    id="🔹-Icon-Color"
                    fill="#ffffff"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </a>
  );
};

export default SharePost;
