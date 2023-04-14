import authError from "../authError";

export default async function API(options: object, address: string) {
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
