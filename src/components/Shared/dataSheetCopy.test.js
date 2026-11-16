import { describe, it, expect, afterEach } from "vitest";
import { handleDataSheetCopy } from "./dataSheetCopy";

const range = (from, to) => {
  const values = [];
  for (let i = Math.min(from, to); i <= Math.max(from, to); i++) {
    values.push(i);
  }
  return values;
};

const copy = ({ start, end }) => {
  const clipboard = {};
  handleDataSheetCopy({
    event: {
      clipboardData: { setData: (type, text) => (clipboard[type] = text) },
    },
    valueRenderer: cell => cell.value,
    data: [
      [{ value: "a" }, { value: "b" }],
      [{ value: "c" }, { value: "d" }],
    ],
    start,
    end,
    range,
  });
  return clipboard["text/plain"];
};

describe("handleDataSheetCopy", () => {
  afterEach(() => {
    window.getSelection().removeAllRanges();
    document.body.innerHTML = "";
  });

  it("copies the text selected with the mouse", () => {
    document.body.innerHTML = "<span id='topic'>Consultation externe</span>";
    window.getSelection().selectAllChildren(document.getElementById("topic"));

    expect(copy({ start: { i: 0, j: 0 }, end: { i: 0, j: 0 } })).toBe(
      "Consultation externe",
    );
  });

  it("copies the selected cells, tab and line separated, without text selection", () => {
    expect(copy({ start: { i: 0, j: 0 }, end: { i: 1, j: 1 } })).toBe(
      "a\tb\nc\td",
    );
  });
});
