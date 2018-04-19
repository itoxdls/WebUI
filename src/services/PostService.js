// @flow
import type {Post} from "../models/Post";

export type PostService = {
    createPost(post: Post):Boolean;
}
export const createPost = (post: Post): Post => {
    return Object.freeze(post);
};
export const PostServiceFactory = () => ({
    createPost
});
export const postService = PostServiceFactory();