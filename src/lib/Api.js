import { getInstance, getManifest, init } from "d2/lib/d2";

class Api {
  /**
   * @param url API endpoint url
   * @param auth Authentication HTTP header content
   */
  constructor() {
    this.cache = [];
    this.userId = "";
    this.baseUrl = "..";
    this.user = process.env.REACT_APP_USER;
    this.password = process.env.REACT_APP_PASSWORD;
    this.ignoredStores = [""];
  }

  /**
   * Initialized the Api to a d2 instance.
   * @returns {Api}
   */
  initialize() {
    let headers =
      process.env.NODE_ENV === "development"
        ? {
            Authorization: "Basic " + btoa(this.user + ":" + this.password),
          }
        : null;
    getManifest("./manifest.json").then(manifest => {
      this.d2 = getManifest("./manifest.webapp")
        .then(dhis2manifest => {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? dhis2manifest.getBaseUrl()
              : process.env.REACT_APP_DHIS2_URL;

          this.baseUrl = baseUrl;
          window.tokenName = manifest.name;
          return baseUrl + "/api";
        })
        .catch(e => {
          return this.url;
        })
        .then(baseUrl =>
          init({ baseUrl, headers }).then(
            d2 => (this.userId = d2.currentUser.username),
          ),
        );
    });
    return this;
  }

  projectToken = () => {
    return getInstance().then(d2 => {
      return d2.dataStore.get("blsq-dataviz").then(namespace => {
        console.log(namespace);
        return namespace.get(window.tokenName).then(value => {
          return value["token"];
        });
      });
    });
  };

  suggestionsFor(autocompleteResourceType, inputValue) {
    return getInstance().then(d2 => {
      return d2.models[autocompleteResourceType]
        .filter()
        .on("name")
        .ilike(inputValue)
        .list();
    });
  }

  levels() {
    return getInstance().then(d2 => {
      return d2.models["organisationUnitLevels"].list().then(data => {
        return data.toArray().map(level => level.name);
      });
    });
  }

  resourcesName(resourceType, value, attributeName) {
    return getInstance().then(d2 => {
      const baseQuery = d2.models[resourceType];
      if (attributeName) {
        return baseQuery
          .filter()
          .on(attributeName)
          .equals(value)
          .list()
          .then(data => {
            const resources = [];
            data.forEach(resource => {
              resources.push(resource);
            });

            return resources.length
              ? {
                  name: resources[0].name,
                  id: resources[0][attributeName],
                }
              : {};
          });
      } else {
        return baseQuery
          .get(value)
          .then(data => ({ name: data.name, id: data.id }));
      }
    });
  }
}

// export default (() => new Api().initialize())();
export default (() => new Api())();
