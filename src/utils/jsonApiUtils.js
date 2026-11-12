import { Deserializer as JSONAPIDeserializer } from "jsonapi-serializer";

export const deserialize = (payload, options = {}) => {
  return new JSONAPIDeserializer({
    keyForAttribute: "camelCase",
    ...options,
  }).deserialize(payload);
};
