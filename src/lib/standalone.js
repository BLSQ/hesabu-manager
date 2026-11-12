// Set by orbf2 when it serves the manager itself (Setup::HesabuManagerController):
// the manager then runs without a dhis2 session, the orbf2 user is logged in
// and the dhis2 reads go through orbf2 (dhis2ApiUrl) with the project credentials.
//
//   { token, url, dhis2ApiUrl, dhis2Url, user: { id, displayName, canEdit } }
export const standaloneConfig = () => window.HESABU_CONFIG;

// same query string as d2 Api.get: arrays are repeated (filter=a&filter=b)
export const toQueryString = params => {
  const search = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    (Array.isArray(value) ? value : [value])
      .filter(v => v !== undefined && v !== null)
      .forEach(v => search.append(key, v));
  });
  const queryString = search.toString();
  return queryString ? `?${queryString}` : "";
};

// the subset of the d2 api (get, baseUrl) used through Api.instance()
export const standaloneDhis2Api = config => ({
  baseUrl: `${config.dhis2Url}/api`,
  get: (path, params) =>
    fetch(`${config.dhis2ApiUrl}/${path}${toQueryString(params)}`, {
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    }).then(response =>
      response.ok ? response.json() : Promise.reject(response),
    ),
  post: () =>
    Promise.reject(new Error("dhis2 writes are not available from orbf2")),
});

// shaped like the dhis2 /me the TokenProvider expects
export const standaloneUser = (config, adminRole) => ({
  ...config.user,
  userCredentials: { userRoles: config.user.canEdit ? [adminRole] : [] },
});
