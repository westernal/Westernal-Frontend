import { useMemo, useState, useRef } from "react";
import API from "../functions/requests/API";

export default function useSearchUsers(searchTerm) {
  const [users, SetUsers] = useState();
  const [isTyped, SetIsTyped] = useState(false);
  const controllerRef = useRef();

  const search = async () => {
    SetIsTyped(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const option = {
      signal: controllerRef.current?.signal,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      var result = await API(option, `api/users/search?username=${searchTerm}`);
    } catch (error) {
      return;
    }

    console.log(result);

    if (result?.status == 200) {
      SetUsers(result.data.users);
      controllerRef.current = null;
    }
  };

  useMemo(() => {
    if (searchTerm) {
      search();
    } else {
      SetUsers([]);
      SetIsTyped(false);
    }
  }, [searchTerm]);

  return [isTyped, users];
}
