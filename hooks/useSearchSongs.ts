import { useMemo, useState, useRef } from "react";

export default function useSearchSongs(searchTerm: string, type: string, token: string) {
  const [data, SetData] = useState<any>([]);
  const [loader, SetLoader] = useState<boolean>(false);
  const controllerRef:any = useRef();

  const search = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    let response;

    if (data.length == 0) {
      SetLoader(true);
    }

    const option = {
      signal: controllerRef.current?.signal,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=${type}&limit=10`,
      option
    );

    const apiData = await response.json();
    const status = response.status;

    if (status == 200) {
      SetData(apiData);
      controllerRef.current = null;
    }

    SetLoader(false);
  };

  useMemo(() => {
    if (searchTerm) {
      search();
    } else SetData([]);
  }, [searchTerm]);

  return {loader, data};
}
