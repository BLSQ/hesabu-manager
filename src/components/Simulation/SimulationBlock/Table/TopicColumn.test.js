import { describe, it, expect, beforeEach, afterEach } from "vitest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { Table } from "./index";
import {
  clampWidth,
  readWidth,
  resetTopicColumnWidth,
  topicCellStyle,
  DEFAULT_WIDTH,
} from "./topicColumnWidth";

const STORAGE_KEY = "hesabu-simulation-topic-column-width";

const row = (code, name) => ({
  meta: { key: code, value: name },
  declaree: {
    key: `${code}_declaree`,
    value: "3",
    solution: "3",
    instantiated_expression: "3",
    is_input: true,
    is_output: false,
  },
});

const periodView = {
  activity_items: [
    row("quant02", "Consultation externe (nvx cas) - indigent"),
    row("quant98", "Consultation externe (nvx cas) - 0 à 1 mois - indigent"),
  ],
};

describe("topic column width helpers", () => {
  beforeEach(() => window.localStorage.clear());

  it("keeps the width between the minimum and the maximum", () => {
    expect(clampWidth(10)).toBe(80);
    expect(clampWidth(350.4)).toBe(350);
    expect(clampWidth(5000)).toBe(1200);
  });

  it("reads the remembered width, full names, or the default", () => {
    expect(readWidth()).toBe(DEFAULT_WIDTH);
    window.localStorage.setItem(STORAGE_KEY, "420");
    expect(readWidth()).toBe(420);
    window.localStorage.setItem(STORAGE_KEY, "full");
    expect(readWidth()).toBeNull();
    window.localStorage.setItem(STORAGE_KEY, "garbage");
    expect(readWidth()).toBe(DEFAULT_WIDTH);
  });

  it("styles a fixed width or wrapped full names", () => {
    expect(topicCellStyle(300)).toEqual({
      maxWidth: 300,
      minWidth: 300,
      width: 300,
    });
    expect(topicCellStyle(null)).toMatchObject({
      maxWidth: "none",
      whiteSpace: "normal",
    });
  });
});

describe("simulation tables names column", () => {
  let container;

  const render = () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <ThemeProvider theme={createTheme()}>
          <Table periodView={periodView} setSelectedCell={() => {}} />
          <Table periodView={periodView} setSelectedCell={() => {}} />
        </ThemeProvider>,
        container,
      );
    });
  };

  const tables = () => Array.from(container.querySelectorAll("table"));
  // the names cells (header and rows) of a table
  const nameCells = table =>
    Array.from(table.querySelectorAll("tr")).map(tr => tr.firstElementChild);
  const handle = table => table.querySelector('[role="separator"]');

  beforeEach(() => {
    window.localStorage.clear();
    resetTopicColumnWidth();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  });

  it("starts at the default width, names cut with an ellipsis", () => {
    render();

    nameCells(tables()[0]).forEach(cell =>
      expect(cell.style.maxWidth).toBe(`${DEFAULT_WIDTH}px`),
    );
  });

  it("resizes the names of every table by dragging one header, and remembers it", () => {
    render();

    act(() => {
      Simulate.mouseDown(handle(tables()[0]), { clientX: 500 });
    });
    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 650 }));
      window.dispatchEvent(new MouseEvent("mouseup"));
    });
    // released: further moves don't resize anymore
    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 900 }));
    });

    tables().forEach(table =>
      nameCells(table).forEach(cell => expect(cell.style.width).toBe("350px")),
    );
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("350");
  });

  it("switches to the full names with a double click, and back", () => {
    render();

    act(() => {
      Simulate.doubleClick(handle(tables()[1]));
    });
    tables().forEach(table =>
      nameCells(table).forEach(cell => {
        expect(cell.style.whiteSpace).toBe("normal");
        expect(cell.style.maxWidth).toBe("none");
      }),
    );
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("full");

    act(() => {
      Simulate.doubleClick(handle(tables()[0]));
    });
    expect(nameCells(tables()[1])[1].style.maxWidth).toBe(`${DEFAULT_WIDTH}px`);
  });

  it("only sizes the names column", () => {
    render();

    const firstRow = tables()[0].querySelectorAll("tbody tr")[0];
    expect(firstRow.children[1].style.maxWidth).toBe("");
  });
});
