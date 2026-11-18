// the "sets" url param of the simulation: the codes of the invoices (packages,
// payment rules) to display, e.g. ?sets=quantite_pma_pmns,paiement_pma_cas_pmns

export const parseSetsParam = value =>
  (value || "")
    .split(",")
    .map(code => code.trim())
    .filter(code => code);

export const KIND_LABELS = {
  payment_rule: "Payment rules",
  package: "Packages",
};

const KIND_ORDER = ["payment_rule", "package"];
const kindRank = kind =>
  KIND_ORDER.includes(kind) ? KIND_ORDER.indexOf(kind) : KIND_ORDER.length;

// the invoices of the org unit, one per code: payment rules then packages,
// each sorted by code
export const invoiceOptions = (invoices, orgUnit) => {
  const byCode = new Map();
  (invoices || [])
    .filter(invoice => invoice.orgunit_ext_id === orgUnit)
    .forEach(invoice =>
      byCode.set(invoice.code, { code: invoice.code, kind: invoice.kind }),
    );
  return [...byCode.values()].sort(
    (a, b) =>
      kindRank(a.kind) - kindRank(b.kind) || a.code.localeCompare(b.code),
  );
};
