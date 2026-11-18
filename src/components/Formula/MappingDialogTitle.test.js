import { describe, it, expect, afterEach } from "vitest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import MappingDialogTitle from "./MappingDialogTitle";

describe("MappingDialogTitle", () => {
  let container;

  const render = element => {
    container = document.createElement("div");
    act(() => {
      ReactDOM.render(element, container);
    });
    return Array.from(
      container.querySelector("#form-dialog-title").children,
    ).map(line => line.textContent.replace(/\s+/g, " ").trim());
  };

  afterEach(() => ReactDOM.unmountComponentAtNode(container));

  it("shows the mapped state and activity with their codes", () => {
    expect(
      render(
        <MappingDialogTitle
          kind="State"
          mapped={{ name: "Quantité déclarée", code: "declared" }}
          topic={{ name: "Consultation externe", code: "quant01" }}
        />,
      ),
    ).toEqual([
      "State : Quantité déclarée declared",
      "Activity : Consultation externe quant01",
    ]);
  });

  it("skips a missing code or topic", () => {
    expect(
      render(<MappingDialogTitle kind="Output" mapped={{ name: "Amount" }} />),
    ).toEqual(["Output : Amount"]);
  });
});
