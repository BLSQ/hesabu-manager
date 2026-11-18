// defaults and checks of the data element created from the mapping dialog
// (see orbf2 DataElementCreator for the server side validation)

export const DATA_ELEMENT_MAX_LENGTHS = { name: 230, shortName: 50, code: 50 };

export const VALUE_TYPES = [
  "NUMBER",
  "INTEGER",
  "INTEGER_POSITIVE",
  "INTEGER_ZERO_OR_POSITIVE",
  "INTEGER_NEGATIVE",
  "UNIT_INTERVAL",
  "PERCENTAGE",
];

export const AGGREGATION_TYPES = [
  "SUM",
  "AVERAGE",
  "AVERAGE_SUM_ORG_UNIT",
  "LAST",
  "MIN",
  "MAX",
  "NONE",
];

const SEPARATOR = " - ";

// most frequent value, the first seen on a tie, undefined when none
const mostCommon = values => {
  const counts = new Map();
  values
    .filter(value => value)
    .forEach(value => counts.set(value, (counts.get(value) || 0) + 1));
  let best;
  counts.forEach((count, value) => {
    if (best === undefined || count > counts.get(best)) {
      best = value;
    }
  });
  return best;
};

// the "<what> - <suffix>" naming of a data element: "Consultation externe - dec" -> "dec"
const nameSuffix = name =>
  name && name.includes(SEPARATOR)
    ? name
        .split(SEPARATOR)
        .pop()
        .trim()
    : undefined;

// "<prefix> - <suffix>" within max, shortening the prefix to keep the suffix
export const fitWithSuffix = (prefix, suffix, max) => {
  const end = `${SEPARATOR}${suffix}`;
  if (end.length >= max) {
    return `${prefix}${end}`.slice(0, max);
  }
  return `${prefix.slice(0, max - end.length).trim()}${end}`;
};

// data elements mapped to the same input (state) on the other topics of the set
const siblingDataElements = (topic, input, topics, lookup) =>
  topics
    .filter(other => other.id !== topic.id)
    .flatMap(other => other.inputMappings || [])
    .filter(
      mapping =>
        mapping.input &&
        mapping.input.id === input.id &&
        mapping.kind === "data_element",
    )
    .map(mapping => lookup(mapping.externalReference))
    .filter(dataElement => dataElement);

const isRate = mapped => /taux|rate/i.test(`${mapped.code} ${mapped.name}`);

// "<topic> - <suffix>" names, "<topic code>_<mapped code>" code, types of the siblings
// (or guessed from the mapped code: a rate is a unit interval averaged)
const defaultsFor = (topic, mapped, siblings) => {
  const suffix =
    mostCommon(siblings.map(dataElement => nameSuffix(dataElement.name))) ||
    mapped.name;
  const max = DATA_ELEMENT_MAX_LENGTHS;
  return {
    name: fitWithSuffix(topic.name, suffix, max.name),
    shortName: fitWithSuffix(
      topic.shortName || topic.name,
      suffix,
      max.shortName,
    ),
    code: `${topic.code}_${mapped.code}`.slice(0, max.code),
    valueType:
      mostCommon(siblings.map(dataElement => dataElement.valueType)) ||
      (isRate(mapped) ? "UNIT_INTERVAL" : "NUMBER"),
    aggregationType:
      mostCommon(siblings.map(dataElement => dataElement.aggregationType)) ||
      (isRate(mapped) ? "AVERAGE" : "SUM"),
  };
};

// name, short name, code and types following what the other topics of the set
// use for this state (naming suffix, value and aggregation types)
export const dataElementDefaults = ({ topic, input, topics, lookup }) =>
  defaultsFor(
    topic,
    input,
    siblingDataElements(topic, input, topics || [], lookup),
  );

// same for the output of a formula: following the data elements the formula is
// mapped to for the other topics; a formula without topic (package, zone,...)
// is named after itself
export const outputDataElementDefaults = ({ topic, formula, lookup }) => {
  const mapped = {
    name: formula.shortName || formula.code,
    code: formula.code,
  };
  const siblings = (formula.formulaMappings || [])
    .filter(mapping => !topic || mapping.topicId !== topic.id)
    // "de.coc" references: the data element
    .map(mapping => lookup(String(mapping.externalReference).split(".")[0]))
    .filter(dataElement => dataElement);
  if (topic) {
    return defaultsFor(topic, mapped, siblings);
  }
  const max = DATA_ELEMENT_MAX_LENGTHS;
  return {
    ...defaultsFor({ name: "", code: "" }, mapped, siblings),
    name: mapped.name.slice(0, max.name),
    shortName: mapped.name.slice(0, max.shortName),
    code: formula.code.slice(0, max.code),
  };
};

// field -> message of the problems to fix before creating the data element
export const dataElementErrors = (dataElement, existingNames = new Set()) => {
  const errors = {};
  Object.entries(DATA_ELEMENT_MAX_LENGTHS).forEach(([field, max]) => {
    const value = (dataElement[field] || "").trim();
    if (!value) {
      errors[field] = "required";
    } else if (value.length > max) {
      errors[field] = `too long (${value.length}, max ${max})`;
    }
  });
  if (!errors.name && existingNames.has(dataElement.name.trim())) {
    errors.name = "a data element with this name already exists";
  }
  return errors;
};
