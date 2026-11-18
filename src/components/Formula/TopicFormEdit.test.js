import { describe, it, expect, afterEach, vi } from "vitest";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { QueryClient, QueryClientProvider } from "react-query";

const requests = [];
vi.mock("../../actions/api", () => ({
  canEdit: () => true,
  externalApi: () => {
    const request = {};
    const chain = {
      url: url => {
        request.url = url;
        return chain;
      },
      put: payload => {
        requests.push({ ...request, method: "put", payload });
        return {
          json: () =>
            Promise.resolve({
              data: { type: "topic", id: "7791", attributes: {} },
            }),
        };
      },
    };
    return chain;
  },
}));

import TopicForm from "./TopicForm";

describe("TopicForm editing an existing topic", () => {
  let container;
  const existingTopic = {
    id: "7791",
    code: "quant98",
    name: "Consultation externe (nvx cas) - 0 à 1 mois - indigent",
    shortName: null,
  };

  const render = (closeNewTopic = () => {}) => {
    const queryClient = new QueryClient();
    queryClient.invalidateQueries = vi.fn();
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <QueryClientProvider client={queryClient}>
          <TopicForm
            set={{ id: "1241" }}
            existingTopic={existingTopic}
            closeNewTopic={closeNewTopic}
            queryClient={queryClient}
          />
        </QueryClientProvider>,
        container,
      );
    });
    return queryClient;
  };

  const input = id => container.querySelector(`#${id}`);
  const saveButton = () =>
    Array.from(container.querySelectorAll("button")).find(
      button => button.textContent === "Save",
    );

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    requests.length = 0;
  });

  it("starts from the topic, with its code locked", () => {
    render();

    expect(input("name").value).toBe(existingTopic.name);
    expect(input("shortName").value).toBe("");
    expect(input("code").value).toBe("quant98");
    expect(input("code").disabled).toBe(true);
    expect(saveButton().disabled).toBe(true);
  });

  it("saves the new names with the unchanged code", async () => {
    const closeNewTopic = vi.fn();
    const queryClient = render(closeNewTopic);

    act(() => {
      Simulate.change(input("name"), {
        target: { value: "Consultation externe - 0 à 1 mois - indigent" },
      });
    });
    act(() => {
      Simulate.change(input("shortName"), {
        target: { value: "Cons ext 0-1m indigent" },
      });
    });
    await act(async () => {
      Simulate.click(saveButton());
    });

    expect(requests).toEqual([
      {
        url: "/topics/7791",
        method: "put",
        payload: {
          data: {
            attributes: {
              name: "Consultation externe - 0 à 1 mois - indigent",
              shortName: "Cons ext 0-1m indigent",
              code: "quant98",
            },
          },
        },
      },
    ]);
    expect(closeNewTopic).toHaveBeenCalled();
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith("loadSets");
  });
});
