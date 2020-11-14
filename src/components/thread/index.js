import React, { useEffect, useState } from "react";
import "./thread.css";
import { Link } from "react-router-dom";
import {
  convertDateToFromNow,
  getRandomBackgroundColor,
} from "../../service/helper";

const Thread = (props) => {
  const [date, setDate] = useState("");
  const [color, setColor] = useState({});

  const initialSetup = () => {
    setDate(convertDateToFromNow(props.thread.created));
    setColor(getRandomBackgroundColor(props.thread.user.name));
  };

  useEffect(initialSetup, []);

  const htmlContent = (
    <div className="container">
      <div className="content">
        <div className="subject">
          <h3>{props.thread.subject}</h3>
        </div>
        <div className="date">
          Created by {props.thread.user.name} {date}
        </div>
        <div className="tags">
          Tags:{" "}
          {props.thread.tags &&
          props.thread.tags.length &&
          Array.isArray(props.thread.tags)
            ? props.thread.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))
            : ""}
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
          pathname: "/thread/" + props.thread.id,
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
