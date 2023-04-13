import { useContext } from "react";
import { createContext } from "react";
import { Post } from "../interfaces/interface";

export const PostContext = createContext<Post>(null);

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostProvider = (props: any) => {
  return (
    <PostContext.Provider value={props.post}>
      {props.children}
    </PostContext.Provider>
  );
};
