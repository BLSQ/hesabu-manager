// TODO: Switch to camel casing
export default {
  en: {
    translations: {
      autocomplete: {
        orgUnits: "Choose an org unit",
        deCoc: "Choose a data element",
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
        reload: "Reload",
        close: "Close",
        last: "Last",
        next: "Next",
        skip: "Skip",
      },
      filters: {
        mockedValues: "Mocked values",
      },
      compound: {
        frequency: "Frequency",
        sidesheet: {
          title: "Compound info",
        },
        sets: "Projects",
      },
      noData: "N/A",
      emptySection: {
        title: "You don’t have any {{resourceName}}",
        body: "Create some and they will appear here.",
      },
      drawerItems: {
        help: {
          main: "Help",
          shortcuts: "Shortcuts",
          first_setup: "First setup",
        },
      },
      topic: {
        name: "Name",
        code: "Code",
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
        set: "project",
        set_plural: "projects",
        compound: "compound",
        compound_plural: "compounds",
        orgUnitGroup: "Organisation unit group",
        orgUnitGroup_plural: "Organisation unit groups",
        orgUnitGroupSet: "Organisation unit group project",
        orgUnitGroupSet_plural: "Organisation unit group projects",
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
          topicFormulas: {
            label: "Activity",
            tooltip: "Input mapping and per activity formulas",
          },
          setFormulas: {
            label: "Project formulas",
            tooltip: "Aggregation of the activity formulas",
          },
          childrenFormulas: {
            label: "Children formulas",
            tooltip: "If multi-entity groupset package. Prefer zone package",
          },
          zoneFormulas: {
            label: "Zone formulas",
            tooltip:
              "Aggregation at main orgunit/zone level of target entities setFormulas",
          },
          zoneTopicFormulas: {
            label: "Zone activity formulas",
            tooltip:
              "Aggregation per activity at main orgunit/zone level of target entities activity formulas",
          },
        },
        sidesheet: {
          title: "Information",
        },
      },
      sets: {
        index: {
          infoBox:
            "Projects are the blocks of your final report. Each project will output one or two tables depending on the type. If you want to make computations with data from multiple projects, create project formulas and they will appear at the end of your report. At any moment, you can see a representation of the report in the simulations page.",
        },
      },
      simulation: {
        sidesheet: {
          title: "Filters",
        },
        ohNo: "Oh no",
        noSimulationForOrgUnit:
          "It looks like there is no project associated with this organization unit.",
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
      snackBars: {
        reloadPage: "A new version is available! Please refresh the page.",
      },
      first_setup: {
        title: "First setup",
      },
      shortcuts: {
        title: "Help — Shortcuts",
        intro:
          "Not many shortcuts for now but these should already speed up your navigation:",
      },
      tours: {
        welcome: {
          title: "Welcome to Hesabu ßeta!",
          content:
            "In order to better reflect the diversity of our projects, we have opted for a new nomenclature compared to the old hesabu. This introductory tour will review these new concepts. The exact mapping of terms can be found in the help section.",
          sets: {
            title: "The projects",
            content:
              "Projects are collections of activities. Each project will produce one or two tables during the simulation depending on its type. You can use inputs from various sources to feed formulas which can then be exported to dhis2 and/or reused in compounds.",
          },
          compounds: {
            title: "The compounds",
            content:
              "Compounds allow you to create and group new formulas by combining existing formulas from several different projects.",
          },
          simulations: {
            title: "The simulations",
            content:
              "For the moment, simulations are still limited to one organization unit and one period. However, they can now self-recharge. This will allow you to automatically recreate a simulation as soon as you make a change to your project or compound.",
          },
        },
      },
    },
  },
};
