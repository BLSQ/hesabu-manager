const knownFunctions = new Set([
  "abs",
  "sqrt",
  "access",
  "array",
  "sum",
  "stdevp",
  "if",
  "min",
  "max",
  "avg",
  "randbetween",
  "round",
  "floor",
  "ceiling",
  "truc",
  "safe_div",
  "score_table",
  "strlen",
  "cal_days_in_month",
  "+",
  "-",
  "/",
  "*",
]);

function isNumeric(str) {
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
}

export const dependencies = expression => {
  const tokens = expression
    .toLowerCase()
    .split(/[%({}\(\)\+\-\*\,/=<>]/gi)
    .map(s => s.trim());

  const tokensWithoutFunctionsAndConstants = tokens.filter(
    s => !knownFunctions.has(s) && s.trim() !== "" && !isNumeric(s),
  );

  return Array.from(new Set(tokensWithoutFunctionsAndConstants));
};

export const formulasToMermaid = (formulas, parent) => {
  const graph = ["graph TD"];
  for (const formula of formulas) {
    for (const dependency of dependencies(formula.expression)) {
      graph.push(`${formula.code} --> ${dependency}`);
    }
  }
  const shape = ["(", ")"];
  for (const formula of formulas) {
    graph.push(`class ${formula.code} current`);
    graph.push(
      `${formula.code}${shape[0]}"${formula.code} <br> ${formula.expression}"${shape[1]}`,
    );
  }
  graph.push("classDef current fill:#f96;");
  const content = graph.join("\n");

  return content;
};
