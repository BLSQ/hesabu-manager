import { Button } from "@material-ui/core";
import { DetailsRounded } from "@material-ui/icons";
import React, { useState } from "react";
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
  const [diffModeIndex, setDiffModeIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const diffMode = diffModes[diffModeIndex];

  const Diff = require("diff");
  let diffParts = [];
  let lineBreaksBefore;
  let lineBreaksAfter;

  let useSplitView = false;

  try {
    lineBreaksBefore = formatDiff(details.before).match(/\n/g) || [];
    lineBreaksAfter = formatDiff(details.after).match(/\n/g) || [];
    if (lineBreaksBefore.length || lineBreaksAfter.length) {
      useSplitView = true;
    } else {
      diffParts = Diff[diffMode](
        formatDiff(details.before),
        formatDiff(details.after),
      );
    }
  } catch (error) {
    debugger;
  }

  return (
    <div
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
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
            return <span style={{ color }}>{part.value}</span>;
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
            <pre>{details.before}</pre>
          </div>
          <div>
            After:
            <pre>{details.after}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualDiff;
