import React, { useEffect, useState } from "react";
import "./footer.css";

const Footer = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [forumHeight, setForumHeight] = useState(0);
  const [className, setClassName] = useState("");

  const attachResizeObserver = () => {
    // Set initial window height
    setWindowHeight(window.innerHeight);

    // Keep track of the window changes
    window.addEventListener("resize", (event) => {
      setWindowHeight(event.target.innerHeight);
    });

    // Add observer for the forum body
    var observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        setForumHeight(cr.height + cr.top);
      }
    });

    // // Observe one or multiple elements
    const forumBody = document.getElementById("forum-body");
    observer.observe(forumBody);
  };

  useEffect(attachResizeObserver, []);
  useEffect(() => {
    if (windowHeight > forumHeight) {
      setClassName("bottom");
    } else {
      setClassName("");
    }
  }, [windowHeight, forumHeight]);

  return (
    <footer className={className}>
      <div className="copyright">
        Copyright © 2020, David Pan and Emile Ferrand
      </div>
    </footer>
  );
};

export default Footer;
