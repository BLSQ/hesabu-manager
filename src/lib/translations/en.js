// TODO: Switch to camel casing
export default {
  en: {
    translations: {
      autocomplete: {
        orgUnits: "Choose an org unit",
      },
      buttons: {
        autoreload: "Auto reload",
        search: "Search",
        back: "Back",
        save: "Save",
        submit: "Submit",
        loading: "Loading",
        seeOnDhis2: "See on dhis2",
        edit: "Edit",
        delete: "Delete",
      },
      noData: "N/A",
      emptySection: {
        title: "You don’t have any {{resourceName}}",
        body: "Create some and they will appear here.",
      },
      drawerItems: {
        help: "Help",
      },
      cellExplanation: {
        noSelectedCell: "Please select a cell to see related information",
        tabs: {
          title: "Cell explanation tabs",
          code: "Code",
          values: "Values",
          debug: "Debug",
        },
      },
      periodicity: {
        monthly: "monthly",
        quarterly: "quaterly",
        yearly: "yearly",
      },
      resources: {
        set: "set",
        set_plural: "sets",
        compound: "compound",
        compound_plural: "compounds",
        orgUnitGroup: "Organisation unit group",
        orgUnitGroup_plural: "Organisation unit groups",
        orgUnitGroupSet: "Organisation unit group set",
        orgUnitGroupSet_plural: "Organisation unit group sets",
        simulation: "simulation",
        simulation_plural: "simulations",
        orgUnit: "organisation unit",
        orgUnit_plural: "organisation units",
        period: "period",
        period_plural: "periods",
        formula: "formula",
        formula_plural: "formulas",
      },
      set: {
        frequency: "Frequency",
        tabs: {
          currentLevel: "Current level",
          children: "Children",
          setFormulas: "Set formulas",
        },
        sidesheet: {
          title: "Information",
        },
      },
      sets: {
        index: {
          infoBox:
            "Sets are the blocks of your final report. Each set will output one or two tables depending on the type. If you want to make computations with data from multiple sets, create project formulas and they will appear at the end of your report. At any moment, you can see a representation of the report in the simulations page.",
        },
      },
      simulation: {
        sidesheet: {
          title: "Filters",
        },
        ohNo: "Oh no",
        noSimulationForOrgUnit:
          "It looks like there is no set associated with this organization unit.",
      },
      simulationForm: {
        projectVersion: {
          legend: "Project Version",
          draft: "Draft",
          v1: "V1",
          v2: "V2",
        },
        dataSource: {
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
      simulationResultStatus: {
        enqueued: {
          title: "You have no simulated yet with these parameters",
          subtitle: "Your simulation is being generated",
        },
        errored: {
          title: "Simulation generation failed",
        },
        new: {
          title: "Your simulation will appear here once you submit the form",
        },
      },
      tooltips: {
        backToDhis2: "Back to Dhis2",
        toggleFilters: "Show/Hide filters",
        toggleSearch: "Show/Hide search",
        toggleInfo: "Show / hide info",
        cell: {
          noData: "No data available",
          input: "This is an input. Click to see details",
          output: "This is an output. Click to see details",
          default: "Click to see detail",
        },
      },
      filtersSheet: {
        title: "Filters",
        label: "Filters list",
      },
    },
  },
};
