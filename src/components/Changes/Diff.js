import { Button } from "@material-ui/core";
import { DetailsRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import "./Button.css";
import SplitView from "./SplitView";
const formatDiff = string => {
  if (string === null || string === undefined) {
    return "";
  }

  return "" + string;
};

const diffModes = [
  "diffSentences",
  "diffChars",
  "diffWords",
  "diffLines",
  "sideBySide",
];

const VisualDiff = ({ details }) => {
  const [diffModeIndex, setDiffModeIndex] = useState(4);
  const [showButton, setShowButton] = useState(false);
  const diffMode = diffModes[diffModeIndex];

  const [diffParts, setDiffParts] = useState([]);
  const [useSplitView, setUseSplitView] = useState(false);

  useEffect(() => {
    let parts = [];
    let lineBreaksBefore;
    let lineBreaksAfter;
    let useSplitView = false;

    lineBreaksBefore = formatDiff(details.before).match(/\n/g) || [];
    lineBreaksAfter = formatDiff(details.after).match(/\n/g) || [];
    if (lineBreaksBefore.length || lineBreaksAfter.length) {
      setUseSplitView(true);
      useSplitView = true;
    }

    if (diffMode != "sideBySide") {
      const Diff = require("diff");

      debugger;
      parts = Diff[diffMode](
        formatDiff(details.before),
        formatDiff(details.after),
      );
    }

    setDiffParts(parts);
  }, [diffModeIndex, diffMode]);

  return (
    <div
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      {diffMode} {diffParts.length}
      {showButton && (
        <Button
          style={{ display: "float", marginBottom: "5px" }}
          className="magicButton"
          variant="outlined"
          onClick={() =>
            setDiffModeIndex((diffModeIndex + 1) % diffModes.length)
          }
        >
          Change diff view : {diffMode}
        </Button>
      )}
      {diffMode !== "sideBySide" && (
        <pre>
          {diffParts.map(part => {
            const color = part.added ? "green" : part.removed ? "red" : "grey";
            const backgroundColor = part.added
              ? "lightgreen"
              : part.removed
              ? "#FFCCCB"
              : undefined;
            return <span style={{ color, backgroundColor }}>{part.value}</span>;
          })}
        </pre>
      )}
      {diffMode === "sideBySide" && useSplitView && (
        <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
          <SplitView
            before={formatDiff(details.before)}
            after={formatDiff(details.after)}
          />
        </div>
      )}
      {diffMode === "sideBySide" && !useSplitView && (
        <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
          <div>
            Before:
            <pre>{formatDiff(details.before)}</pre>
          </div>
          <div>
            After:
            <pre>{formatDiff(details.after)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualDiff;
