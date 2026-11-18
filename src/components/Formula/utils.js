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

export const formulasToMermaid = (formulas, prefix_url, mode) => {
  const actualMode = mode || "TD";
  const graph = [`graph ${actualMode}`];
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

const normalizeForSearch = str =>
  (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

// keeps the topics whose name, short name or code contains every word of the filter
// (case and accent insensitive)
export const filterTopics = (topics, filter) => {
  const words = normalizeForSearch(filter)
    .split(/\s+/)
    .filter(word => word.length > 0);
  if (words.length === 0) {
    return topics;
  }
  return topics.filter(topic => {
    const haystack = normalizeForSearch(
      [topic.name, topic.shortName, topic.code].join(" "),
    );
    return words.every(word => haystack.includes(word));
  });
};

const isInputMapped = (topic, input) =>
  (topic.inputMappings || []).some(
    mapping => mapping.input && mapping.input.id === input.id,
  );

const isFormulaMapped = (topic, formula) =>
  (formula.formulaMappings || []).some(mapping => mapping.topicId === topic.id);

// keeps the topics with at least one input or formula mapping, then the
// inputs and formulas mapped for at least one of those topics ; decision
// tables have no mapping, their columns are dropped
export const onlyMapped = (topics, inputs, formulas) => {
  const mappedTopics = topics.filter(
    topic =>
      inputs.some(input => isInputMapped(topic, input)) ||
      formulas.some(formula => isFormulaMapped(topic, formula)),
  );
  return {
    topics: mappedTopics,
    inputs: inputs.filter(input =>
      mappedTopics.some(topic => isInputMapped(topic, input)),
    ),
    formulas: formulas.filter(formula =>
      mappedTopics.some(topic => isFormulaMapped(topic, formula)),
    ),
    decisionTables: [],
  };
};

// the sets other than currentSetId that contain the topic (deserialized /sets)
export const otherSetsUsingTopic = (sets, topicId, currentSetId) =>
  (sets || []).filter(
    set =>
      String(set.id) !== String(currentSetId) &&
      (set.topics || []).some(topic => String(topic.id) === String(topicId)),
  );
