import React from "react";

const formatDiff = string => {
  if (string === null || string === undefined) {
    return "";
  }

  return "" + string;
};

const VisualDiff = ({ details, diffMode }) => {
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
    <>
      <div>
        {diffParts.map(part => {
          const color = part.added ? "green" : part.removed ? "red" : "grey";
          return <span style={{ color }}>{part.value}</span>;
        })}
      </div>
    </>
  );
};

export default VisualDiff;
