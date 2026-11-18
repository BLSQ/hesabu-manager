import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider, focusManager } from "react-query";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

// what the orbf2 api answers for the simulation job, and the s3 result files
let job;
const results = {};
const resultRequests = [];
const apiRequests = [];

vi.mock("../../actions/api", () => ({
  externalApi: () => {
    const chain = {
      errorType: () => chain,
      url: url => {
        apiRequests.push(url);
        return chain;
      },
      get: () => chain,
      json: () =>
        Promise.resolve({
          data: { id: job.id, type: "invoicingJob", attributes: { ...job } },
        }),
    };
    return chain;
  },
}));

vi.mock("wretch", () => ({
  default: () => {
    let url;
    const chain = {
      url: u => {
        url = u;
        return chain;
      },
      get: () => chain,
      json: () => {
        resultRequests.push(url);
        return results[url]
          ? Promise.resolve(JSON.parse(JSON.stringify(results[url])))
          : Promise.reject(
              Object.assign(new Error("Forbidden"), { status: 403 }),
            );
      },
    };
    return chain;
  },
}));

let rendered;
vi.mock("../../components/Simulation", () => ({
  default: props => {
    rendered = props;
    return null;
  },
}));

import SimulationContainer, { apiSearch } from "./index";

describe("SimulationContainer", () => {
  let container;
  let history;
  let queryClient;

  const flush = () => act(() => new Promise(resolve => setTimeout(resolve, 0)));

  const render = async url => {
    history = createMemoryHistory({ initialEntries: [url] });
    queryClient = new QueryClient();
    container = document.createElement("div");
    act(() => {
      ReactDOM.render(
        <ThemeProvider theme={createTheme()}>
          <QueryClientProvider client={queryClient}>
            <Router history={history}>
              <SimulationContainer />
            </Router>
          </QueryClientProvider>
        </ThemeProvider>,
        container,
      );
    });
    await flush();
    await flush();
  };

  beforeEach(() => {
    job = {
      id: "335027",
      status: "processed",
      processedAt: "2026-11-18T15:08:42Z",
      resultUrl: "https://s3/result-1",
    };
    results["https://s3/result-1"] = { invoices: ["first"] };
    resultRequests.length = 0;
    apiRequests.length = 0;
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    queryClient.clear();
  });

  it("shows the result of the processed job", async () => {
    await render("/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4");

    expect(rendered.simulation.id).toBe("335027");
    expect(rendered.simulationResults.invoices).toEqual(["first"]);
    expect(rendered.errorMessage).toBeUndefined();
    expect(resultRequests).toEqual(["https://s3/result-1"]);
  });

  it("doesn't refetch the result with its expired link when coming back to the page", async () => {
    await render("/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4");
    // the job is unchanged, its link is re-signed at each api call
    job = { ...job, resultUrl: "https://s3/result-1-resigned" };

    act(() => focusManager.setFocused(false));
    act(() => focusManager.setFocused(true));
    await flush();
    await flush();

    expect(resultRequests).toEqual(["https://s3/result-1"]);
    expect(rendered.simulationResults.invoices).toEqual(["first"]);
    expect(rendered.errorMessage).toBeUndefined();
  });

  it("fetches the new result once the job is processed again", async () => {
    await render("/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4");
    job = {
      ...job,
      processedAt: "2026-11-18T16:00:00Z",
      resultUrl: "https://s3/result-2",
    };
    results["https://s3/result-2"] = { invoices: ["second"] };

    act(() => focusManager.setFocused(false));
    act(() => focusManager.setFocused(true));
    await flush();
    await flush();

    expect(resultRequests).toEqual([
      "https://s3/result-1",
      "https://s3/result-2",
    ]);
    expect(rendered.simulationResults.invoices).toEqual(["second"]);
  });

  it("asks the api again for other api params of the same org unit and period", async () => {
    await render("/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4");
    job = { ...job, id: "335028", resultUrl: "https://s3/result-3" };
    results["https://s3/result-3"] = { invoices: ["only pma"] };

    act(() =>
      history.push(
        "/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4&mockedValues=true",
      ),
    );
    await flush();
    await flush();

    expect(rendered.simulation.id).toBe("335028");
    expect(rendered.simulationResults.invoices).toEqual(["only pma"]);
  });

  it("filters the display without asking the api nor downloading again", async () => {
    await render("/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4");

    act(() =>
      history.push(
        "/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4&sets=quantite_pma_pmns&displayedOrgUnit=ZP1txmy7Cik",
      ),
    );
    await flush();
    await flush();

    expect(apiRequests).toEqual([
      "/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4",
    ]);
    expect(resultRequests).toEqual(["https://s3/result-1"]);
    expect(rendered.simulationResults.invoices).toEqual(["first"]);
    expect(rendered.valuesFromParams.sets).toBe("quantite_pma_pmns");
  });

  it("doesn't send the display params to the api", async () => {
    await render(
      "/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4&sets=quantite_pma_pmns",
    );

    expect(apiRequests).toEqual([
      "/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4",
    ]);
  });

  it("explains a failed result download instead of a json parse error", async () => {
    job = { ...job, resultUrl: "https://s3/expired" };

    await render("/simulation?orgUnit=ZP1txmy7Cik&periods=2026Q4");

    expect(rendered.errorMessage).toBe("simulation result failed (403)");
  });

  it("asks nothing without org unit and period", async () => {
    await render("/simulation?periods=2026Q4");

    expect(rendered.simulation).toBeUndefined();
    expect(resultRequests).toEqual([]);
  });
});

describe("apiSearch", () => {
  it("keeps the api params, drops the display ones", () => {
    expect(
      apiSearch(
        "?orgUnit=ZP1&periods=2026Q4&sets=a,b&displayedOrgUnit=X&displaySet=s&displayPeriod=p&mockedValues=true",
      ),
    ).toBe("?orgUnit=ZP1&periods=2026Q4&mockedValues=true");
  });

  it("is empty without params", () => {
    expect(apiSearch("?sets=a")).toBe("");
    expect(apiSearch("")).toBe("");
  });
});
