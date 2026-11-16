import { describe, it, expect } from "vitest";
import { shortNameHint, codeHint, SHORT_NAME_MAX_LENGTH } from "./TopicForm";

describe("shortNameHint", () => {
  it("shows the length counter while under the limit", () => {
    expect(shortNameHint("Consult externe")).toEqual({
      error: false,
      text: `15/${SHORT_NAME_MAX_LENGTH} characters`,
    });
  });

  it("accepts exactly the max length", () => {
    expect(shortNameHint("a".repeat(40)).error).toBe(false);
  });

  it("flags and counts the extra characters above the limit", () => {
    expect(
      shortNameHint("Consult externe (nvx cas) - 0 à 1 mois - indigent"),
    ).toEqual({
      error: true,
      text: "49/40 characters (9 too many)",
    });
  });
});

describe("codeHint", () => {
  it.each(["", "quant98", "assisted_deliveries"])("accepts %j", code => {
    expect(codeHint(code).error).toBe(false);
  });

  it.each(["Quant98", "quant 98", "quant-98", "é"])("rejects %j", code => {
    expect(codeHint(code).error).toBe(true);
  });
});
