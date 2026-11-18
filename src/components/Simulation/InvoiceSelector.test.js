import { describe, it, expect, afterEach, vi } from "vitest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import InvoiceSelector from "./InvoiceSelector";

describe("InvoiceSelector", () => {
  let container;
  const options = [
    { code: "paiement_pma_cas_pmns", kind: "payment_rule" },
    { code: "quantite_pma_pmns", kind: "package" },
  ];

  const render = props => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <InvoiceSelector options={options} onChange={() => {}} {...props} />,
        container,
      );
    });
  };

  const chips = () =>
    Array.from(container.querySelectorAll(".MuiChip-root")).map(
      chip => chip.textContent,
    );

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  });

  it("shows the selected invoices, also the ones without invoice for this org unit", () => {
    render({ selected: ["quantite_pma_pmns", "not_here"] });

    expect(chips()).toEqual(["quantite_pma_pmns", "not_here"]);
  });

  it("has its own width, not the one of its shrink-to-fit container", () => {
    render({ selected: [] });

    const root = container.querySelector(".MuiAutocomplete-root");
    expect(root.style.width).toBe("800px");
  });

  it("shows 'all' when nothing is selected", () => {
    render({ selected: [] });

    expect(chips()).toEqual([]);
    expect(container.querySelector("input").placeholder).toBe("all");
  });

  it("sends the remaining codes when one is removed", () => {
    const onChange = vi.fn();
    render({
      selected: ["paiement_pma_cas_pmns", "quantite_pma_pmns"],
      onChange,
    });

    const deleteIcon = container.querySelectorAll(".MuiChip-deleteIcon")[0];
    act(() => {
      Simulate.click(deleteIcon);
    });

    expect(onChange).toHaveBeenCalledWith(["quantite_pma_pmns"]);
  });
});
