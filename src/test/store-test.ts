import fetch from 'node-fetch'
import {Post} from "../models/Post";
import {Comment} from "../models/Comment";
import {commentService} from "../services/CommentService";
import {commentStore} from "../store/CommentStore"
/*
const comment1 = commentService.createComment({
  postId: 1,
  id: 2,
  name: "string",
  email: "string",
  body: "string"
});

commentStore.all().map((comment:Comment) => {
  console.log(comment);
});
*/
var asyncPromise = function(postId:number){
  return new Promise((resolve, reject) => {
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
    console.log('End');
  });
});