import useSWR from "swr";

const fetcher = async (options, url) => {
  const response = await fetch(url, options);

  const data = await response.json();

  return data;
};

export default function SWR(options, address) {
  const host = "https://alinavidi.ir/";
  const url = host + address;
  const { data, status } = useSWR(url, (url) => fetcher(options, url));

  return { data, status };
}
