const pad = month => String(month).padStart(2, "0");
const yyyymm = (year, month) => Number(`${year}${pad(month)}`);

// converts a dhis2 period (2022, 202206, 20220615, 2022Q2, 2022July)
// into its first and last month as YYYYMM numbers, null if not a period
export const periodToMonthRange = period => {
  const value = (period || "").trim();
  let match;
  if ((match = value.match(/^(\d{4})$/))) {
    return { from: yyyymm(match[1], 1), to: yyyymm(match[1], 12) };
  }
  if ((match = value.match(/^(\d{4})(\d{2})(\d{2})?$/))) {
    const month = Number(match[2]);
    if (month < 1 || month > 12) {
      return null;
    }
    return { from: yyyymm(match[1], month), to: yyyymm(match[1], month) };
  }
  if ((match = value.match(/^(\d{4})Q([1-4])$/i))) {
    const lastMonth = Number(match[2]) * 3;
    return {
      from: yyyymm(match[1], lastMonth - 2),
      to: yyyymm(match[1], lastMonth),
    };
  }
  if ((match = value.match(/^(\d{4})July$/i))) {
    const year = Number(match[1]);
    return { from: yyyymm(year, 7), to: yyyymm(year + 1, 6) };
  }
  return null;
};

const normalizeForSearch = str =>
  (str || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

// a decision table without periods applies to every period
const coversPeriod = (decision, range) => {
  const start = periodToMonthRange(decision.startPeriod);
  const end = periodToMonthRange(decision.endPeriod);
  const from = start ? start.from : -Infinity;
  const to = end ? end.to : Infinity;
  return from <= range.to && range.from <= to;
};

// keeps the decision tables matching every word of the filter: a word matches
// when the name contains it, or when it's a period within the table's periods
export const filterDecisionTables = (decisions, filter) => {
  const words = (filter || "").split(/\s+/).filter(word => word.length > 0);
  if (words.length === 0) {
    return decisions;
  }
  return decisions.filter(decision => {
    const name = normalizeForSearch(decision.name);
    return words.every(word => {
      const range = periodToMonthRange(word);
      return (
        name.includes(normalizeForSearch(word)) ||
        (range !== null && coversPeriod(decision, range))
      );
    });
  });
};
