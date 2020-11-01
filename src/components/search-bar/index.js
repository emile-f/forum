import React from "react";
import "./search-bar.css";

const SearchBar = (props) => {
  return (
    <div className="search-bar">
      <input
        id="search"
        alt="search"
        name="search"
        placeholder="Search for thread"
        type="text"
        value={props.value}
        onChange={(event) => props.onSearch(event.target.value)}
      ></input>
      <button onClick={props.search}>Search</button>
    </div>
  );
};

export default SearchBar;
