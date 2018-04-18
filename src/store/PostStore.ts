import {Post} from "../models/Post";
import {PostState} from "./PostState";

export type PostStore = {
    addPost(post: Post): void;
};
export const addPost = (postState: PostState, post: Post): PostState => {
    return postState.concat(post);
};
export const PostStoreFactory = (() => {
    let postState: PostState = [];
    
    return {
      addPost: (post: Post) => {
          postState = addPost(postState, post);
      },
      all: () => {
        return postState;
      }
    }
});
export const postStore = PostStoreFactory();