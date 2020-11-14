import React, { useEffect, useState } from "react";
import "./feed.css";
import { getAllThreads, searchAllThreads } from "../../api/thread";
import ThreadList from "../../components/thread-list";
import Loader from "react-loader-spinner";
import PageHead from "../../components/page-head";
import { Link } from "react-router-dom";
import SearchBar from "../../components/search-bar";

const Feed = (props) => {
  const [threads, setThreads] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [searchThreads, setSearchThreads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const triggerSearch = () => {
    if (searchTerm !== "") {
      onSearch(searchTerm);
    } else {
      setSearchThreads(threads);
    }
  };

  useEffect(() => {
    getAllThreads()
      .then((response) => {
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

  const onSearch = (term) => {
    setDataAvailable(false);
    searchAllThreads(term)
      .then((response) => {
        // Insert users
        setSearchThreads(response.data);

        // Let UI know that the users are available
        setDataAvailable(true);
        setSearchDone(true);
      })
      .catch((err) => {
        // TODO: Show error message
        console.error("Failed to get all threads", err);
      });
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSearchThreads([]);
    setSearchDone(false);
  };

  return (
    <div className="feed">
      <PageHead className="title" title="Home" />

      <div className="container">
        {
          // Show loader until we load the user list
          dataAvailable ? (
            <ThreadList
              threads={searchThreads.length > 0 ? searchThreads : threads}
            />
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
        <SearchBar
          value={searchTerm}
          search={triggerSearch}
          onSearch={setSearchTerm}
        />
        {searchDone ? (
          <div onClick={resetSearch} className="search-info">
            {searchThreads.length > 0 ? "Reset search" : "No threads found"}
          </div>
        ) : (
            ""
          )}
      </aside>
    </div>
  );
};

export default Feed;
