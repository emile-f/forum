import React, { useEffect, useState } from "react";
import "./thread.css";
import { Link } from "react-router-dom";
import { convertDateToFromNow, getRandomBackgroundColor } from "../../service/helper";

const Thread = (props) => {
  const [date, setDate] = useState("");
  const [color, setColor] = useState({});

  console.log("props", props);
  const threadHeader = "/thread/" + props.thread.id;
  console.log("threadHeader", threadHeader);

  useEffect(() => {
    setDate(convertDateToFromNow(props.thread.created));
    setColor(getRandomBackgroundColor(props.thread.user.name));
  }, []);

  const htmlContent = (
    <div className="container">
      <div className="vertical-centering icon">
        <div style={color}>{props.thread.user.name.substring(0, 2)}</div>
      </div>
      <div className="content">
        <div className="subject">
          <h3>{props.thread.subject}</h3>
        </div>
        <div className="date">
          Created by {props.thread.user.name} {date}
        </div>
        <div className="message">
          <p>{props.thread.post.content}</p>
        </div>
      </div>
      <div className="comments vertical-centering">
        <p>{props.thread.count - 1} comments</p>
      </div>
    </div>
  );

  if (props.clickable) {
    return (
      <Link
        className="thread"
        to={{
          pathname: threadHeader,
          state: { threadId: props.thread.id },
        }}
      >
        {htmlContent}
      </Link>
    );
  } else {
    return <div className="thread">{htmlContent}</div>;
  }
};

export default Thread;
