import { useState } from "react";

const SearchSong = (e) => {
  const [songs, SetSongs] = useState([]);
  const search = async () => {
    const input = document.getElementById("search").value;
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer BQC77q3QW-uuAXoA0Ro_IO0TnBMIVA05_fw-lG4QkIwF8Os-GA-U4iQI6H8n6CT3G5dqG-uXL5gokWiy0UE6YIlTrcH4NKB7fhMNrf9Ky5jSJ9N7Hen6i_dQAcMUu3F0uRGcdHPbLdnAcW8Dg1ee5xkjsgixb4BBLs6RbLWkevd4syqINx16zLwX2kITsN4",
      },
    };

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${input}&type=track`,
      option
    );

    const data = await response.json();

    const status = response.status;

    if (status == 200) {
      SetSongs(data);
    }
  };

  return (
    <input type="text" placeholder="Search" id="search" onKeyDown={search} />
  );
};

export default SearchSong;
