/* globals describe, it, expect */

import { errorsForAttr } from "./formErrors";

describe("errorsForAttr", () => {
  it("returns the value for the adhoc errors", () => {
    expect(errorsForAttr({ hello: "blah" }, "hello")).toEqual("blah");
  });

  it("returns undefined when not found", () => {
    expect(errorsForAttr({ hello: "blah" }, "bouh")).toEqual(undefined);
  });
});
