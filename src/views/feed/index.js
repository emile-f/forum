import React, { useEffect, useState } from "react";
import "./feed.css";
import { getAllThreads } from "../../api/thread";
import ThreadList from "../../components/thread-list";
import Loader from "react-loader-spinner";
import PageHead from "../../components/page-head";
import { Link } from "react-router-dom";

const Feed = (props) => {
  const [threads, setThreads] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    getAllThreads()
      .then((response) => {
        // On positive response
        console.log("data", response.data);

        // Insert users
        setThreads(response.data);

        // Let UI know that the users are available
        setDataAvailable(true);
      })
      .catch((err) => {
        // TODO: Show error message
        console.error("Failed to get all threads", err);
      });
  }, []);

  return (
    <div className="feed">
      <PageHead className="title" title="Home" />

      <div className="container">
        {
          // Show loader until we load the user list
          dataAvailable ? (
            <ThreadList threads={threads} />
          ) : (
            <Loader
              type="Puff"
              color="#4f5d75"
              height={100}
              width={100}
              className="loader"
            />
          )
        }
      </div>

      <aside>
        <Link to="/thread/new_thread">
          <div className="create-new-thread">Create new thread</div>
        </Link>
      </aside>
    </div>
  );
};

export default Feed;
