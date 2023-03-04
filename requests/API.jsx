import authError from "../functions/authError";

export default async function API(options, address) {
  const host = "https://alinavidi.ir/";

  const response = await fetch(host + address, options);

  const data = await response.json();

  const status = response.status;

  if (status == 403) {
    authError();
  }

  var requestResult = { status, data };

  return requestResult;
}
