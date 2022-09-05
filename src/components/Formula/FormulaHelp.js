import React from "react";
import functions from "./functions.json";

const FormulaHelp = props => {
  return (
    <div style={{ maxWidth: "600px" }}>
      <h3>More advanced expressions</h3>

      <h4>Math:</h4>
      <code>{"+, -, *, /"}</code>

      <h4>Logic:</h4>
      <code>{"<, >, <=, >=, <>, !=, =, AND, OR"}</code>

      <h4>Functions:</h4>
      {Object.values(functions)
        .sort()
        .map((f, index) => (
          <div key={index}>
            <h4 style={{ color: "#AB1441" }}>
              <b>
                <code>{f[0]}</code>
              </b>
            </h4>
            <div dangerouslySetInnerHTML={{ __html: f[1] }}></div>
          </div>
        ))}
    </div>
  );
};

export default FormulaHelp;
