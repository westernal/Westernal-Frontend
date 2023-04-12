import { useContext } from "react";
import { createContext } from "react";

export const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostProvider = (props) => {
  return (
    <PostContext.Provider value={props.post}>
      {props.children}
    </PostContext.Provider>
  );
};
