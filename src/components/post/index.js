import React from "react";
import "./post.css";

const Post = (props) => {
  return (
    <div>
      <ul>
        <li>created: {props.post.created}</li>
        <li>active: {props.post.active}</li>
        <li>content: {props.post.content}</li>
        <li>user: {JSON.stringify(props.post.user)}</li>
      </ul>
    </div>
  );
};

export default Post;
