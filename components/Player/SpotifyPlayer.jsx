import { useEffect } from "react";

const SpotifyPlayer = ({ URL }) => {
  useEffect(() => {
    const getPlayer = async () => {
      const option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };

      const response = await fetch(
        `https://open.spotify.com/oembed?url=${URL}`,
        option
      );

      const data = await response.json();

      const status = response.status;

      if (status == 200) {
        document.getElementById("spotify-player").appendChild(data.html);
      }
    };
    if (URL) {
      getPlayer();
    }
  }, [URL]);

  return <div className="spotify-player"></div>;
};

export default SpotifyPlayer;
