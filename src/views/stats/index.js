import React, { useState, useEffect, lazy, Suspense } from "react";
import "./stats.css";
import Loader from "react-loader-spinner";
import { getUserStats } from "../../api/user";
import { getLocations } from "../../api/location";
// import Map from "../../components/map";
const Map = lazy(() => import("../../components/map"));

const Stats = (props) => {
  const [stats, setStats] = useState({});
  const [locations, setLocations] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);


  const loader = (
    <Loader
      type="Puff"
      color="#4f5d75"
      height={100}
      width={100}
      className="loader"
    />
  );
  useEffect(() => {
    const getData = async () => {
      try {
        const promiseArray = [getUserStats(), getLocations()];
        const data = await Promise.all(promiseArray);

        // go over all requests
        data.forEach((response) => {
          if (response && response.data) {
            if (Array.isArray(response.data)) {
              // locations
              setLocations(response.data);
            } else {
              setStats(response.data);
            }
          }
          // Let UI know that the users are available
          setDataAvailable(true);
        });
      } catch (error) {
        console.error("Failed to get user stats");
      }
    };
    getData();
  }, []);

  return (
    <div className="stats">
      <h1>Forum stats:</h1>
      <div className="container">
        {
          // Show loader until we load the user list
          dataAvailable ? (
            <div className="data">
              <ul>
                <li>Users: {stats.userCount}</li>
                <li>Threads: {stats.threadCount}</li>
                <li>Posts: {stats.postCount}</li>
              </ul>
              <Suspense fallback={loader}>
                <Map locations={locations} />
              </Suspense>
            </div>
          ) : (
              loader
            )
        }
      </div>
    </div>
  );
};

export default Stats;
