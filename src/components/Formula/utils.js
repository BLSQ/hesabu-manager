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
  "eval_array",
  "array",
  "+",
  "-",
  "/",
  "*",
  "and",
  "or",
]);

function isNumeric(str) {
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
}

export const dependencies = expression => {
  const tokens = expression
    .split(" and ")
    .flatMap(s => s.split(" AND "))
    .flatMap(s => s.split(" OR "))
    .flatMap(s => s.split(" or "))
    .flatMap(s => s.split("!="))
    .flatMap(s => s.split("&&"))
    .flatMap(s => s.split("||"))
    .flatMap(s => s.split('"'))
    .flatMap(s => s.split("'"))
    .flatMap(s => s.split(/[%({}\(\)\+\-\*\,/=<>]/gi))
    .map(s => s.trim());

  const tokensWithoutFunctionsAndConstants = tokens.filter(
    s =>
      !knownFunctions.has(s.toLowerCase()) && s.trim() !== "" && !isNumeric(s),
  );

  return Array.from(new Set(tokensWithoutFunctionsAndConstants));
};

export const escapeQuotes = str => {
  return str.split('"').join("&bdquo;");
};

export const formulasToMermaid = (formulas, prefix_url) => {
  const graph = ["graph TD"];
  for (const formula of formulas) {
    for (const dependency of dependencies(formula.expression)) {
      graph.push(`${dependency} --> ${formula.code}`);
    }
  }
  const shape = ["(", ")"];
  for (const formula of formulas) {
    graph.push(`class ${formula.code} current`);
    graph.push(
      `${formula.code}${shape[0]}"${formula.code} <br> ${escapeQuotes(
        formula.expression.split("\n").join("<br>"),
      )}"${shape[1]}`,
    );
    graph.push(`click ${formula.code} "${prefix_url}/${formula.id}"`);
  }
  graph.push("classDef current fill:#f96;");
  const content = graph.join("\n");

  return content;
};
