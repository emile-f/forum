import React, { useState, useEffect } from "react";
import "./thread.css";
import { withRouter, Redirect } from "react-router-dom";
import { getThread } from "../../api/thread";
import Loader from "react-loader-spinner";
import PostList from "../../components/post-list";
import NewPost from "../../components/new-post";
import Thread from "../../components/thread";
const ThreadPage = (props) => {
  // declare states
  const [id, setId] = useState(undefined);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [threadLoaded, setThreadLoaded] = useState(false);
  const [thread, setThread] = useState({});
  const [posts, setPosts] = useState({});

  // Get thread here

  useEffect(() => {
    if (
      props.location &&
      props.location.state &&
      props.location.state.threadId
    ) {
      setId(props.location.state.threadId);
    } else if (props.match && props.match.params && props.match.params.thread) {
      setId(props.match.params.thread);
    } else {
      setRedirectToHome(true);
    }
  }, []);

  useEffect(() => {
    console.log("Id updated", id);

    const getPosts = () => {
      getThread(id)
        .then((response) => {
          if (response.status === 200) {
            console.log("Get thread success");
            // link to thread page
            console.log("thread", response.data);
            if (
              response.data &&
              response.data.length &&
              response.data.length > 0
            ) {
              const temp = response.data[0];
              temp.post = response.data[0].posts[0];
              temp.count = response.data[0].posts.length;

              setThread(temp);
              setPosts(response.data[0].posts);
              setThreadLoaded(true);
            }
          } else if (response.status === 202) {
            console.error("error", response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (id) {
      getPosts();
    }
  }, [id]);

  const addPostToList = (post) => {
    setPosts(() => [...posts, post]);
  };

  const scrollToNewPost = () => {
    const newPost = document.getElementById("new-post");
    newPost.scrollIntoView(true);
  };

  if (redirectToHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="thread">
      {
        // Show loader until we load the user list
        threadLoaded ? (
          // posts here
          <div>
            <Thread clickable={false} thread={thread} />

            <div className="content">
              <PostList posts={posts} />
              <aside>
                <div onClick={scrollToNewPost}>
                  <div className="create-new-post">Create new post</div>
                </div>
              </aside>
            </div>

            <br />
            <NewPost
              id="new-post"
              success={addPostToList}
              threadId={thread.id}
            />
          </div>
        ) : (
          <Loader
            type="Puff"
            color="#4f5d75;"
            height={100}
            width={100}
            className="loader"
          />
        )
      }
    </div>
  );
};

export default withRouter(ThreadPage);
