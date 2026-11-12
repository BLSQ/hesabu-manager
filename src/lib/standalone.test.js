import {
  standaloneConfig,
  standaloneDhis2Api,
  standaloneUser,
  toQueryString,
} from "./standalone";

const config = {
  token: "token",
  url: "https://orbf2.example.com",
  dhis2ApiUrl: "https://orbf2.example.com/setup/hesabu_manager/dhis2/api",
  dhis2Url: "https://dhis2.example.com",
  user: { id: "orbf2-12", displayName: "admin@example.com", canEdit: true },
};
const adminRole = { id: "qNSdAsHodjc", name: "Hesabu Admin" };

afterEach(() => {
  delete window.HESABU_CONFIG;
  delete global.fetch;
});

describe("standaloneConfig", () => {
  it("is undefined when running as a dhis2 app", () => {
    expect(standaloneConfig()).toBeUndefined();
  });

  it("is the config injected by orbf2", () => {
    window.HESABU_CONFIG = config;
    expect(standaloneConfig()).toEqual(config);
  });
});

describe("toQueryString", () => {
  it("repeats arrays like d2 and skips empty values", () => {
    expect(
      toQueryString({
        fields: "id,name",
        filter: ["name:ilike:anc", "domainType:eq:AGGREGATE"],
        paging: false,
        pageSize: undefined,
      }),
    ).toEqual(
      "?fields=id%2Cname&filter=name%3Ailike%3Aanc&filter=domainType%3Aeq%3AAGGREGATE&paging=false",
    );
  });

  it("is empty without params", () => {
    expect(toQueryString()).toEqual("");
    expect(toQueryString({})).toEqual("");
  });
});

describe("standaloneDhis2Api", () => {
  it("reads dhis2 through orbf2 with the orbf2 session", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => ({ dataElements: [] }) }),
    );
    const api = standaloneDhis2Api(config);

    const response = await api.get("dataElements", { paging: false });

    expect(response).toEqual({ dataElements: [] });
    expect(
      global.fetch,
    ).toHaveBeenCalledWith(
      "https://orbf2.example.com/setup/hesabu_manager/dhis2/api/dataElements?paging=false",
      { credentials: "same-origin", headers: { Accept: "application/json" } },
    );
  });

  it("rejects on dhis2 errors like d2", async () => {
    const failed = { ok: false, status: 404 };
    global.fetch = vi.fn(() => Promise.resolve(failed));

    await expect(
      standaloneDhis2Api(config).get("identifiableObjects/unknown"),
    ).rejects.toBe(failed);
  });

  it("links to the real dhis2 for the 'view on dhis2' buttons", () => {
    expect(standaloneDhis2Api(config).baseUrl).toEqual(
      "https://dhis2.example.com/api",
    );
  });

  it("refuses dhis2 writes", async () => {
    await expect(
      standaloneDhis2Api(config).post("userRoles", {}),
    ).rejects.toThrow("dhis2 writes are not available from orbf2");
  });
});

describe("standaloneUser", () => {
  it("gives the hesabu admin role to editors", () => {
    expect(standaloneUser(config, adminRole)).toEqual({
      id: "orbf2-12",
      displayName: "admin@example.com",
      canEdit: true,
      userCredentials: { userRoles: [adminRole] },
    });
  });

  it("gives no role to read-only users", () => {
    const readOnly = { ...config, user: { ...config.user, canEdit: false } };
    expect(
      standaloneUser(readOnly, adminRole).userCredentials.userRoles,
    ).toEqual([]);
  });
});
