import { useState } from "react";
import { useEffect } from "react";
import getSpotifyToken from "../../requests/getSpotifyToken";

const exploreMusics = () => {
  const [token, SetToken] = useState();
  const [categories, SetCategories] = useState([]);

  const getCategories = async () => {
    SetToken(await getSpotifyToken());

    let response;

    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    response = await fetch(
      `https://api.spotify.com/v1/recommendations`,
      option
    );

    const data = await response.json();
    const status = response.status;
    console.log(data);

    if (status == 200) {
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return <div className="explore"></div>;
};

export default exploreMusics;
