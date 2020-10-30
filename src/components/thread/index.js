import React from "react";
import "./thread.css";
import { Link } from "react-router-dom";
import * as moment from "moment";

// Change the page in router to the correct querystring
// uses react-router linking
// we can restyle this to be in a nav bar

const Thread = (props) => {
  console.log("props", props);
  const threadHeader = "/thread/" + props.thread.id;
  console.log("threadHeader", threadHeader);

  const convertDate = (date) => {
    return moment(date).fromNow();
  };

  return (
    <Link
      className="thread"
      to={{
        pathname: threadHeader,
        state: { threadId: props.thread.id },
      }}
    >
      <div className="container">
        <div className="vertical-centering icon">
          <div>{props.thread.user.name.substring(1, 3)}</div>
        </div>
        <div className="content">
          <div className="subject">
            <h3>{props.thread.subject}</h3>
          </div>
          <div className="date">
            created: {convertDate(props.thread.created)}
          </div>
          <div className="message">
            <p>{props.thread.post.content}</p>
          </div>
        </div>
        <div className="comments vertical-centering">
          <p>{props.thread.count - 1} comments</p>
        </div>
      </div>
    </Link>
  );
};

export default Thread;
