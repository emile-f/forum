import React, { useEffect, useState } from "react";
import "./feed.css";
import { getAllThreads } from "../../api/thread";
import ThreadList from "../../components/thread-list";
import Loader from "react-loader-spinner";

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
      <h1>feed page here</h1>
      <div className="container">
        {
          // Show loader until we load the user list
          dataAvailable ? (
            <ThreadList threads={threads} />
          ) : (
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              className="loader"
            />
          )
        }
      </div>
    </div>
  );
};

export default Feed;
