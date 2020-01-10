const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

export const deserialize = payload => {
  return new JSONAPIDeserializer({
    keyForAttribute: "camelCase",
  }).deserialize(payload);
};
