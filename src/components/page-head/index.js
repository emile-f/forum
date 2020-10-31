import React from "react";
import "./page-head.css";

function PageHead(props) {
  return (
    <div className="page-head">
      <h1>{props.title}</h1>
    </div>
  );
}

export default PageHead;
