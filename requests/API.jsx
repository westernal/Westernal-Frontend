export default async function API(options, address) {
  const host = "https://alinavidi.ir/";

  const response = await fetch(host + address, options);

  const data = await response.json();

  const status = response.status;

  var ret = { status, data };

  return ret;
}
