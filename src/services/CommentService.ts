// @flow
import {Comment} from "../models/Comment";

export type CommentService = {
    createComment(comment: Comment):Boolean;
}
export const createComment = (comment: Comment): Comment => {
    return Object.freeze(comment);
};
export const CommentServiceFactory = () => ({
    createComment
});
export const commentService = CommentServiceFactory();