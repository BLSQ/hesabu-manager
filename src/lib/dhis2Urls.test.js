import { describe, it, expect } from "vitest";
import { dhis2MaintenanceUrl } from "./dhis2Urls";

describe("dhis2MaintenanceUrl", () => {
  const dhis2Url = "https://dhis2.fbp-rdc.org";

  it("links a data element to its maintenance edit page", () => {
    expect(
      dhis2MaintenanceUrl(
        { id: "xbEUTBqhw9t", dimensionItemType: "DATA_ELEMENT" },
        dhis2Url,
      ),
    ).toBe(
      "https://dhis2.fbp-rdc.org/dhis-web-maintenance/index.html#/edit/dataElementSection/dataElement/xbEUTBqhw9t",
    );
  });

  it("links an indicator to its maintenance edit page", () => {
    expect(
      dhis2MaintenanceUrl(
        { id: "Ind1234567a", dimensionItemType: "INDICATOR" },
        dhis2Url,
      ),
    ).toBe(
      "https://dhis2.fbp-rdc.org/dhis-web-maintenance/index.html#/edit/indicatorSection/indicator/Ind1234567a",
    );
  });

  it("keeps only the data element of a data element.category option combo id", () => {
    expect(
      dhis2MaintenanceUrl(
        { id: "xbEUTBqhw9t.HllvX50cXC0", dimensionItemType: "DATA_ELEMENT" },
        `${dhis2Url}/`,
      ),
    ).toBe(
      "https://dhis2.fbp-rdc.org/dhis-web-maintenance/index.html#/edit/dataElementSection/dataElement/xbEUTBqhw9t",
    );
  });

  it("has no url without a known type, an id or the dhis2 url", () => {
    expect(dhis2MaintenanceUrl(undefined, dhis2Url)).toBeUndefined();
    expect(
      dhis2MaintenanceUrl(
        { id: "abc", dimensionItemType: "PROGRAM_INDICATOR" },
        dhis2Url,
      ),
    ).toBeUndefined();
    expect(
      dhis2MaintenanceUrl({ dimensionItemType: "DATA_ELEMENT" }, dhis2Url),
    ).toBeUndefined();
    expect(
      dhis2MaintenanceUrl(
        { id: "abc", dimensionItemType: "DATA_ELEMENT" },
        undefined,
      ),
    ).toBeUndefined();
  });
});
