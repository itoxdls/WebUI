import {Comment} from "../models/Comment";
import {CommentState} from "./CommentState";

export type CommentStore = {
  addComment(comment: Comment): void;
};
export const addComment = (commentState: CommentState, comment: Comment): CommentState => {
    return commentState.concat(comment);
};
export const CommentStoreFactory = (() => {
    let commentState: CommentState = [];
    
    return {
      addComment: (comment: Comment) => {
        commentState = addComment(commentState, comment);
      },
      all: () => {
        return commentState;
      }
    }
});
export const commentStore = CommentStoreFactory();