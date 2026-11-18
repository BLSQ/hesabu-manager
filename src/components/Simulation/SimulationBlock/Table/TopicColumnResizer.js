import React, { useRef } from "react";
import PropTypes from "prop-types";
import { DEFAULT_WIDTH } from "./topicColumnWidth";

// grab handle on the right edge of the names header: drag to resize the
// column, double click to switch between full names and a fixed width
const TopicColumnResizer = ({ width, onResize }) => {
  const handle = useRef();

  const startDrag = event => {
    event.preventDefault();
    const startX = event.clientX;
    const header = handle.current && handle.current.parentElement;
    const startWidth =
      width === null ? (header && header.offsetWidth) || DEFAULT_WIDTH : width;
    const move = moveEvent => onResize(startWidth + moveEvent.clientX - startX);
    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };

  return (
    <span
      ref={handle}
      role="separator"
      aria-orientation="vertical"
      title="Drag to resize, double click for the full names"
      onMouseDown={startDrag}
      onDoubleClick={() => onResize(width === null ? DEFAULT_WIDTH : null)}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: 8,
        cursor: "col-resize",
        borderRight: "2px solid #ddd",
      }}
    />
  );
};

TopicColumnResizer.propTypes = {
  width: PropTypes.number,
  onResize: PropTypes.func.isRequired,
};

export default TopicColumnResizer;
