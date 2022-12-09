import { useState } from "react";
import { useEffect } from "react";
import getSpotifyToken from "../../requests/getSpotifyToken";

const SpotifyPlayer = ({ url }) => {
  const [spotifyEmbed, SetSpotifyEmbed] = useState();

  useEffect(() => {
    getSpotifyEmbed();
  }, []);

  const getSpotifyEmbed = async () => {
    const token = await getSpotifyToken();

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json+oembed",
      },
    };

    const response = await fetch(
      `https://open.spotify.com/oembed?url=${url}`,
      options
    );

    const data = await response.json();
    const status = response.status;

    console.log(data);

    SetSpotifyEmbed(data.html);
  };

  return <div className="spotify-player">{spotifyEmbed && spotifyEmbed}</div>;
};

export default SpotifyPlayer;
