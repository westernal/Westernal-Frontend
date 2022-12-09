import { useState } from "react";
import { useEffect } from "react";
import getSpotifyToken from "../../requests/getSpotifyToken";

const SpotifyPlayer = ({ url }) => {
  const [link, SetLink] = useState(new URL(url));

  return (
    <iframe
      src={`https://open.spotify.com/embed${link.pathname}`}
      frameBorder="0"
      width={"100%"}
      height={"360px"}
    ></iframe>
  );
};

export default SpotifyPlayer;
