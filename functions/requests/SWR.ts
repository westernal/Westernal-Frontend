import useSWR from "swr";

const fetcher = async (options, url:string) => {
  const response = await fetch(url, options);

  const data = await response.json();

  return data;
};

export default function SWR(options, address: string) {
  const host = "https://alinavidi.ir/";
  const url = host + address;
  const { data } = useSWR(url, (url) => fetcher(options, url));

  return { data };
}
