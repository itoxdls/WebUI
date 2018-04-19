//@flow
//import fetch from 'node-fetch'
import type {Post} from "../models/Post";
import type {Comment} from "../models/Comment";
import {commentService} from "../services/CommentService";
import {commentStore} from "../store/CommentStore"

/* 
  Return a list with all comments of every post
*/
const asyncPromise = (postId:number) => {
    return new Promise((resolve, reject) => {
        console.log(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        fetch(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`,{})
        .then(response => { return response.json() })
        .then((comments:Comment[]) => {
            comments.map((comment:Comment) => {
                commentStore.addComment(commentService.createComment(comment));
            });
            resolve(true);
        });
    });
}
export type LocalCommentStore = {
  loadComments(): void;
  getComments(): Comment[];
};
// Load all post for create a promise for load the comments 
export const loadComments = (callback:Function): void => {
    console.log('constructor');
    fetch('http://jsonplaceholder.typicode.com/posts',{})
    .then(response => { return response.json() })
    .then((posts:Post[]) => {
        let requestPromise = [];
        posts.map((post:Post) => {
            requestPromise.push(asyncPromise(post.id));
        });
        return requestPromise;
    }).then((requestPromise) => {
        Promise.all(requestPromise)
        .then(() => {
            console.log('comment length: ' + commentStore.all().length);
            callback(commentStore.all());
        });
    });
};
export const getComments = (callback:Function): void => {
    callback(commentStore.all());
};
export const LocalCommentStoreFactory = (() => {
    return {
      getComments:(callback:Function): void => {
        return commentStore.all().length <= 0 ? loadComments(callback) : getComments(callback);
      }
    }
});
export const localCommentStore = LocalCommentStoreFactory();