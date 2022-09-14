import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./Button.css";
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
  try {
    diffParts = Diff[diffMode](
      formatDiff(details.before),
      formatDiff(details.after),
    );
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
          style={{ display: "float" }}
          class="magicButton"
          variant={"outlined"}
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

      {diffMode === "sideBySide" && (
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
