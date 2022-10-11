import React from "react";
import ReactDiffViewer from "react-diff-viewer";

const SplitView = props => (
  <ReactDiffViewer
    oldValue={props.before.replace(/\r\n/g, "\n")}
    newValue={props.after.replace(/\r\n/g, "\n")}
    splitView={true}
  />
);

export default SplitView;
