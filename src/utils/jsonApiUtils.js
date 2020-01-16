const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

export const deserialize = (payload, options = {}) => {
  return new JSONAPIDeserializer({
    keyForAttribute: "camelCase",
    ...options,
  }).deserialize(payload);
};
