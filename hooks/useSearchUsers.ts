import { useMemo, useState, useRef } from "react";
import API from "../functions/requests/API";
import { User } from "../interfaces/interface";

export default function useSearchUsers(searchTerm: string) {
  const [users, SetUsers] = useState<User[]>();
  const [isTyped, SetIsTyped] = useState<boolean>(false);
  const controllerRef: any = useRef();

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

  return {isTyped, users};
}
