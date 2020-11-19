import React, { useState, useEffect } from "react";
import "./thread.css";
import { withRouter, Redirect } from "react-router-dom";
import { getThread } from "../../api/thread";
import Loader from "react-loader-spinner";
import PostList from "../../components/post-list";
import NewPost from "../../components/new-post";
import Thread from "../../components/thread";
import ReactPaginate from "react-paginate";

const ThreadPage = (props) => {
  // declare states
  const [id, setId] = useState(undefined);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [threadLoaded, setThreadLoaded] = useState(false);
  const [thread, setThread] = useState({});
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  // Get thread here
  const initialSetup = () => {
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
  };

  useEffect(initialSetup, []);

  useEffect(() => {
    const currentPageData = posts.slice(offset, offset + PER_PAGE);
    setVisiblePosts(currentPageData);
  }, [currentPage, offset, posts]);

  useEffect(() => {
    const getPosts = () => {
      getThread(id)
        .then((response) => {
          if (response.status === 200) {
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
          console.error(error);
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
            <Thread titleOfPage={true} clickable={false} thread={thread} />

            <div className="content">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(posts.length / PER_PAGE)}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
              <PostList posts={visiblePosts} />
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(posts.length / PER_PAGE)}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
              <div className="aside">
                <button className="create-new-post" onClick={scrollToNewPost}>
                  Create new post
                </button>
              </div>
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
