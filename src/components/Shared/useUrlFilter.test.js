import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import useUrlFilter, { searchWithParam, FILTER_DELAY } from "./useUrlFilter";

describe("searchWithParam", () => {
  it("sets, replaces and removes the param, keeping the others", () => {
    expect(searchWithParam("", "filter", "prix")).toBe("?filter=prix");
    expect(searchWithParam("?a=1&filter=old", "filter", "new")).toBe(
      "?a=1&filter=new",
    );
    expect(searchWithParam("?a=1&filter=old", "filter", "")).toBe("?a=1");
    expect(searchWithParam("?filter=old", "filter", "")).toBe("");
  });

  it("encodes spaces and accents", () => {
    const search = searchWithParam("", "filter", "équité 2022Q1");
    expect(new URLSearchParams(search).get("filter")).toBe("équité 2022Q1");
  });
});

describe("useUrlFilter", () => {
  let container;
  let hook;

  // url logic, without the typing delay (see "while typing" below)
  const Probe = () => {
    hook = useUrlFilter("filter", { delay: 0 });
    return null;
  };

  const renderAt = history =>
    act(() => {
      ReactDOM.render(
        <Router history={history}>
          <Probe />
        </Router>,
        container,
      );
    });

  beforeEach(() => {
    window.sessionStorage.clear();
    container = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it("reads the filter from the url", () => {
    const history = createMemoryHistory({
      initialEntries: ["/sets/1/decisions?filter=prix"],
    });
    renderAt(history);
    expect(hook[0]).toBe("prix");
  });

  it("writes the filter in the url without adding history entries", () => {
    const history = createMemoryHistory({
      initialEntries: ["/sets/1/decisions"],
    });
    renderAt(history);
    act(() => hook[1]("2022Q1"));

    expect(hook[0]).toBe("2022Q1");
    expect(history.location.pathname).toBe("/sets/1/decisions");
    expect(history.location.search).toBe("?filter=2022Q1");
    expect(history.length).toBe(1);

    act(() => hook[1](""));
    expect(history.location.search).toBe("");
  });

  it("restores the filter of the screen when coming back without it in the url", () => {
    const history = createMemoryHistory({
      initialEntries: ["/sets/1/topic_formulas"],
    });
    renderAt(history);
    act(() => hook[1]("consult"));

    // tab links don't carry the query
    act(() => history.push("/sets/1/decisions"));
    expect(hook[0]).toBe("");
    act(() => history.push("/sets/1/topic_formulas"));

    expect(hook[0]).toBe("consult");
    expect(history.location.search).toBe("?filter=consult");
  });

  it("doesn't restore a cleared filter", () => {
    const history = createMemoryHistory({
      initialEntries: ["/sets/1/topic_formulas"],
    });
    renderAt(history);
    act(() => hook[1]("consult"));
    act(() => hook[1](""));
    act(() => history.push("/sets/1/decisions"));
    act(() => history.push("/sets/1/topic_formulas"));

    expect(hook[0]).toBe("");
  });

  it("keeps the url filter over the remembered one", () => {
    window.sessionStorage.setItem(
      "hesabu-filter:/sets/1/topic_formulas",
      "remembered",
    );
    const history = createMemoryHistory({
      initialEntries: ["/sets/1/topic_formulas?filter=shared"],
    });
    renderAt(history);

    expect(hook[0]).toBe("shared");
  });
});

describe("useUrlFilter with several params on one screen", () => {
  let container;
  let text;
  let mapped;

  const Probe = () => {
    text = useUrlFilter("filter", { delay: 0 });
    mapped = useUrlFilter("mapped", { delay: 0 });
    return null;
  };

  beforeEach(() => {
    window.sessionStorage.clear();
    container = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it("keeps each param separately, in the url and when coming back", () => {
    const history = createMemoryHistory({
      initialEntries: ["/sets/1/topic_formulas"],
    });
    act(() => {
      ReactDOM.render(
        <Router history={history}>
          <Probe />
        </Router>,
        container,
      );
    });
    act(() => text[1]("consult"));
    act(() => mapped[1]("1"));
    expect(new URLSearchParams(history.location.search).get("filter")).toBe(
      "consult",
    );
    expect(new URLSearchParams(history.location.search).get("mapped")).toBe(
      "1",
    );

    act(() => history.push("/sets/1/decisions"));
    act(() => history.push("/sets/1/topic_formulas"));

    expect(text[0]).toBe("consult");
    expect(mapped[0]).toBe("1");
  });

  it("keeps both params when set in the same render", () => {
    const history = createMemoryHistory({
      initialEntries: ["/sets/1/topic_formulas"],
    });
    act(() => {
      ReactDOM.render(
        <Router history={history}>
          <Probe />
        </Router>,
        container,
      );
    });
    act(() => {
      text[1]("consult");
      mapped[1]("1");
    });
    expect(history.location.search).toBe("?filter=consult&mapped=1");
  });
});

describe("useUrlFilter while typing", () => {
  let container;
  let hook;
  let history;

  const Probe = () => {
    hook = useUrlFilter();
    return null;
  };

  beforeEach(() => {
    vi.useFakeTimers();
    window.sessionStorage.clear();
    container = document.createElement("div");
    history = createMemoryHistory({
      initialEntries: ["/sets/1/topic_formulas"],
    });
    act(() => {
      ReactDOM.render(
        <Router history={history}>
          <Probe />
        </Router>,
        container,
      );
    });
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    vi.useRealTimers();
  });

  const [input, , filter] = [0, 1, 2];
  const type = text => act(() => hook[1](text));
  const wait = ms => act(() => vi.advanceTimersByTime(ms));

  it("shows the typing at once, filters and writes the url once it pauses", () => {
    type("c");
    type("co");
    type("con");

    expect(hook[input]).toBe("con");
    expect(hook[filter]).toBe("");
    expect(history.location.search).toBe("");

    wait(FILTER_DELAY - 1);
    expect(history.location.search).toBe("");

    wait(1);
    expect(history.location.search).toBe("?filter=con");
    expect(hook[filter]).toBe("con");
    expect(hook[input]).toBe("con");
  });

  it("restarts the delay at each key", () => {
    type("co");
    wait(FILTER_DELAY - 50);
    type("con");
    wait(FILTER_DELAY - 50);

    expect(history.location.search).toBe("");

    wait(50);
    expect(history.location.search).toBe("?filter=con");
  });

  it("follows the url changed by something else, dropping the pending typing", () => {
    type("con");
    act(() => history.replace("/sets/1/topic_formulas?filter=prix"));

    expect(hook[input]).toBe("prix");
    expect(hook[filter]).toBe("prix");

    wait(FILTER_DELAY);
    expect(history.location.search).toBe("?filter=prix");
  });

  it("drops the pending typing when leaving the screen", () => {
    type("con");
    act(() => ReactDOM.unmountComponentAtNode(container));

    wait(FILTER_DELAY);
    expect(history.location.search).toBe("");
  });
});
