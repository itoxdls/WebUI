//@flow
import type {Comment} from "../models/Comment";
import type {CommentState} from "./CommentState";

export type CommentStore = {
  addComment(comment: Comment): void;
  getComment(id: number): Comment;
};
export const addComment = (commentState: CommentState, comment: Comment): CommentState => {
    return commentState.concat(comment);
};
export const getComment = (commentState: CommentState, id: number): Comment => {
  const index = commentState.findIndex((comment: Comment) => comment.id == id);
  return commentState[index];
};
export const CommentStoreFactory = (() => {
    let commentState: CommentState = [];
    
    return {
      addComment: (comment: Comment) => {
        commentState = addComment(commentState, comment);
      },
      getComment: (id: number) => {
        return getComment(commentState, id);
      },
      all: () => {
        return commentState;
      }
    }
});
export const commentStore = CommentStoreFactory();