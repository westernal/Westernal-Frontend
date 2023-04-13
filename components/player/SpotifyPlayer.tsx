import { useState } from "react";

const SpotifyPlayer = ({
  url,
  height = "360px",
}: {
  url: string;
  height?: string;
}) => {
  const [link, SetLink] = useState(new URL(url));

  return (
    <iframe
      src={`https://open.spotify.com/embed${link.pathname}`}
      width={"100%"}
      height={height}
      frameBorder={0}
    ></iframe>
  );
};

export default SpotifyPlayer;
