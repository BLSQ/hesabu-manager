/* globals describe, it, expect */

import reducer from "./api";
import { RECEIVE_TOKEN, RECEIVE_TOKEN_ERROR } from "../constants/types";

describe("api reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      error: null,
      user: null,
    });
  });

  it("should respond to RECEIVE_TOKEN", () => {
    expect(
      reducer(
        {},
        {
          type: RECEIVE_TOKEN,
          token: "token",
        },
      ),
    ).toEqual({
      token: "token",
    });
  });

  it("should respond to RECEIVE_TOKEN_ERROR", () => {
    expect(
      reducer(
        {},
        {
          type: RECEIVE_TOKEN_ERROR,
          error: "error",
        },
      ),
    ).toEqual({
      error: "error",
    });
  });
});
