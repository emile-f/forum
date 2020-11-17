import React, { useEffect, useRef } from "react";
import "./search-bar.css";

const SearchBar = (props) => {
  const inputRef = useRef();
  const SearchButtonRef = useRef();

  const triggerEvent = (event) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      SearchButtonRef.current.click();
    }
  };

  const initialSetup = () => {
    if (inputRef.current) {
      // Execute a function when the user releases a key on the keyboard
      inputRef.current.addEventListener("keyup", triggerEvent);
      // Remove on destroy
      return () => {
        inputRef.current.removeEventListener("keyup", triggerEvent);
      };
    }
  };

  useEffect(initialSetup, []);

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        id="search"
        alt="search"
        name="search"
        placeholder="Search for thread"
        aria-label="Search for thread"
        type="text"
        value={props.value}
        onChange={(event) => props.onSearch(event.target.value)}
      ></input>
      <button
        ref={SearchButtonRef}
        aria-label="Search in Threads"
        onClick={props.search}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
