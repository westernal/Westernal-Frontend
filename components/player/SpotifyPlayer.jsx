import { useState } from "react";

const SpotifyPlayer = ({ url, height = "360px" }) => {
  const [link, SetLink] = useState(new URL(url));

  return (
    <iframe
      src={`https://open.spotify.com/embed${link.pathname}`}
      frameborder="0"
      width={"100%"}
      height={height}
    ></iframe>
  );
};

export default SpotifyPlayer;
