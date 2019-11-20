// TODO: Switch to camel casing
export default {
  en: {
    translations: {
      buttons: {
        search: "Search",
        back: "Back",
      },
      emptySection: {
        title: "You don’t have any {{resourceName}}",
        body: "Create some and they will appear here.",
      },
      drawerItems: {
        sets: "Sets",
        setsGroups: "Sets groups",
        simulations: "Simulations",
        help: "Help",
      },
      resources: {
        set: "set",
      },
      sets: {
        index: {
          infoBox:
            "Sets are the blocks of your final report. Each set will output one or two tables depending on the type. If you want to make computations with data from multiple sets, create project formulas and they will appear at the end of your report. At any moment, you can see a representation of the report in the simulations page.",
        },
      },
      simulationForm: {
        projectVersion: {
          legend: "Project Version",
          draft: "Draft",
          v1: "V1",
          v2: "V2",
        },
        data_source: {
          legend: "Data Source",
          dhis: "DHIS2 Values",
          mocked: "Fake Values",
        },
        orgUnit: {
          legend: "Organisation Unit",
          label: "Organisation Unit",
          help: "Select an organisation you want to see the simulation for",
        },
      },
      tooltips: {
        backToDhis2: "Back to Dhis2",
        toggleFilters: "Show/Hide filters",
        toggleSearch: "Show/Hide search",
      },
      filtersSheet: {
        title: "Filters",
        label: "Filters list",
      },
    },
  },
};
