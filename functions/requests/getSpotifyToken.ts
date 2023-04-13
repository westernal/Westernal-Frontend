export default async function getSpotifyToken() {
  const clientToken =
    "355a112f4a27485cbbb614e817d439c8:f12328b921684083802df0f82574a6ee";

  let response: any;

  const option = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic" + " " + new Buffer(clientToken).toString("base64"),
    },
    body: "grant_type=client_credentials",
    json: true,
  };

  response = await fetch(`https://accounts.spotify.com/api/token`, option);

  const data = await response.json();

  const status = response.status;

  if (status == 200) {
    return data.access_token;
  }
}
