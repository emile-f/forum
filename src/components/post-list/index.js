import React from "react";
import "./user-list.css";
import Post from "../post";

function PostList(props) {
  const posts = props.posts;
  console.log("posts", posts);
  const listItems = posts.map((post, index) => (
    <Post key={index} post={post} />
  ));
  return <div className="post-list">{listItems}</div>;
}

export default PostList;
