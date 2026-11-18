import { describe, it, expect } from "vitest";
import { invoiceOptions, parseSetsParam } from "./invoiceFilters";

const invoice = (code, kind, orgunit_ext_id = "ZP1", period = "2026Q4") => ({
  code,
  kind,
  orgunit_ext_id,
  period,
});

describe("invoiceOptions", () => {
  const invoices = [
    invoice("quantite_pma_pmns", "package", "ZP1", "202610"),
    invoice("quantite_pma_pmns", "package", "ZP1", "202611"),
    invoice("gestion_des_fraudes", "package", "other"),
    invoice("vignette_pma", "package"),
    invoice("paiement_pma_cas_pmns", "payment_rule"),
    invoice("gestion_des_fraudes", "package"),
  ];

  it("lists each invoice code of the org unit once, payment rules first", () => {
    expect(invoiceOptions(invoices, "ZP1")).toEqual([
      { code: "paiement_pma_cas_pmns", kind: "payment_rule" },
      { code: "gestion_des_fraudes", kind: "package" },
      { code: "quantite_pma_pmns", kind: "package" },
      { code: "vignette_pma", kind: "package" },
    ]);
  });

  it("only takes the invoices of the org unit", () => {
    expect(invoiceOptions(invoices, "other")).toEqual([
      { code: "gestion_des_fraudes", kind: "package" },
    ]);
  });

  it("puts unknown kinds last and tolerates no results", () => {
    expect(
      invoiceOptions(
        [invoice("zone", "zone_rule"), invoice("pkg", "package")],
        "ZP1",
      ).map(option => option.code),
    ).toEqual(["pkg", "zone"]);
    expect(invoiceOptions(undefined, "ZP1")).toEqual([]);
  });
});

describe("parseSetsParam", () => {
  it("splits the comma separated codes, dropping the blanks", () => {
    expect(
      parseSetsParam("quantite_pma_pmns, paiement_pma_cas_pmns,,"),
    ).toEqual(["quantite_pma_pmns", "paiement_pma_cas_pmns"]);
    expect(parseSetsParam(undefined)).toEqual([]);
  });
});
