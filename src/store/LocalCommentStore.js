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
  getComments(callback:Function): Comment[];
  getComment(id:number): Comment;
};
export const loadCommentsLocalStorage = () : boolean => {
    // Check if exist data in local storage
    let data = localStorage.getItem("comments");
    // If exist data, load comments from here
    if (data) {
        let dataList = JSON.parse(data);
        dataList.forEach(element => {
            commentStore.addComment(commentService.createComment(element));
        });
        return true;
    }
    return false;
}
// Load all post for create a promise for load the comments 
export const loadComments = (callback:Function): void => {
    
    // Check if load from local store
    if(loadCommentsLocalStorage()){
        callback(commentStore.all());
        return;
    }

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
            
            // Save in local storage
            localStorage.setItem("comments", JSON.stringify(commentStore.all()));

            callback(commentStore.all());
        });
    });
};
export const getComments = (callback:Function): void => {
    callback(commentStore.all());
};
export const getComment = (id:number): Comment => {
    return commentStore.getComment(id);
};
export const LocalCommentStoreFactory = (() => {
    return {
      getComments:(callback:Function): void => {
        return commentStore.all().length <= 0 ? loadComments(callback) : getComments(callback);
      },
      getComment:(id:number): Comment => {
        return getComment(id);
      }
    }
});
export const localCommentStore = LocalCommentStoreFactory();