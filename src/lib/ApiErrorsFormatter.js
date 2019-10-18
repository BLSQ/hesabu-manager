import camelCase from "lodash/camelCase";
import isArray from "lodash/isArray";

export default (scope, messages) => {
  const errors = messages[0];
  const fields = Object.keys(errors);
  return fields.reduce(
    (obj, field) => {
      obj[scope][camelCase(field)] = isArray(errors[field])
        ? errors[field].join(",")
        : errors[field];
      return obj;
    },
    { [scope]: {} },
  );
};
