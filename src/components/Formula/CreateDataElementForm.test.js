import { describe, it, expect, afterEach, vi } from "vitest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import CreateDataElementForm from "./CreateDataElementForm";

describe("CreateDataElementForm", () => {
  let container;

  const dataElement = {
    name: "Consultation externe - dec",
    shortName: "s".repeat(51),
    code: "quant98_declaree",
    valueType: "NUMBER",
    aggregationType: "SUM",
  };

  const render = (props = {}) => {
    container = document.createElement("div");
    act(() => {
      ReactDOM.render(
        <CreateDataElementForm
          dataElement={dataElement}
          errors={{ shortName: "too long (51, max 50)" }}
          onChange={() => {}}
          {...props}
        />,
        container,
      );
    });
  };

  const field = name => container.querySelector(`input[data-field="${name}"]`);
  const helperOf = name =>
    field(name)
      .closest(".MuiFormControl-root")
      .querySelector(".MuiFormHelperText-root");

  afterEach(() => ReactDOM.unmountComponentAtNode(container));

  it("shows the length of each text against the dhis2 maximum", () => {
    render();

    expect(helperOf("name").textContent).toBe("26 / 230");
    expect(helperOf("code").textContent).toBe("16 / 50");
  });

  it("shows the errors next to the length", () => {
    render();

    expect(helperOf("shortName").textContent).toBe(
      "51 / 50 - too long (51, max 50)",
    );
    expect(helperOf("shortName").classList.contains("Mui-error")).toBe(true);
    expect(helperOf("name").classList.contains("Mui-error")).toBe(false);
  });

  it("sends the changed data element", () => {
    const onChange = vi.fn();
    render({ onChange });

    act(() => {
      Simulate.change(field("code"), { target: { value: "quant98_dec" } });
    });

    expect(onChange).toHaveBeenCalledWith({
      ...dataElement,
      code: "quant98_dec",
    });
  });
});
