export default {
  fr: {
    translations: {
      autocomplete: {
        orgUnits: "Choisissez une unité d’organisation",
      },
      buttons: {
        search: "Rechercher",
        back: "Retour",
        save: "Sauver",
        submit: "Envoyez",
        loading: "En cours",
      },
      noData: "N/D",
      emptySection: {
        title: "Vous n'avez aucun.e {{resourceName}}",
        body: "Créez-en et ils apparaîtront ici.",
      },
      drawerItems: {
        help: "Aide",
      },
      cellExplanation: {
        noSelectedCell:
          "Veuillez sélectionner une cellule pour voir les informations connexes",
        tabs: {
          title: "Onglets des explication de cellules",
          code: "Code",
          values: "Valeurs",
          debug: "Débug",
        },
      },
      resources: {
        set: "set",
        set_plural: "sets",
        setsGroup: "groupe de sets",
        setsGroup_plural: "groupes de sets",
        simulation: "simulation",
        simulation_plural: "simulations",
        orgUnit: "organisation unit",
        orgUnit_plural: "organisation units",
        period: "period",
        period_plural: "periods",
        formula: "formule",
        formula_plural: "formules",
      },
      set: {
        tabs: {
          currentLevel: "Niveau actuel",
          children: " Enfants",
          setFormulas: "Formules du set",
        },
        sidesheet: {
          title: "Information",
        },
      },
      sets: {
        index: {
          infoBox:
            "Les sets sont les blocs de votre rapport final. Chaque ensemble produira un ou deux tableaux en fonction du type. Si vous souhaitez effectuer des calculs avec des données provenant de plusieurs sets, créez des formules de projet qui apparaîtront à la fin de votre rapport. A tout moment, vous pouvez voir une représentation du rapport dans la page de simulation.",
        },
      },
      simulation: {
        sidesheet: {
          title: "Filtres",
        },
      },
      simulationForm: {
        projectVersion: {
          legend: "Version du projet",
          draft: "Brouillon",
          v1: "V1",
          v2: "V2",
        },
        dataSource: {
          legend: "Source de données",
          dhis: "Valeurs DHIS2",
          mocked: "Valeurs Fake",
        },
        orgUnit: {
          legend: "Unité d’organisation",
          label: "Unité d’organisation",
          help:
            "Selectionnez une l’unité d’organisation pour laquelle vous voulez voir la simulation",
        },
      },
      simulationResultStatus: {
        enqueued: {
          title: "Vous n’avez pas encore du simulation avec ces paramètres",
          subtitle: "Votre simulation est en cours de génération",
        },
        errored: {
          title: "La génération de simulation a échoué",
        },
      },
      tooltips: {
        backToDhis2: "Retour à Dhis2",
        toggleFilters: "Montrez / cachez les filtres",
        toggleSearch: "Afficher / masquer la recherche",
        toggleInfo: "Afficher / masquer les infos",
      },
      filtersSheet: {
        title: "Filtres",
        label: "Liste des filtres",
      },
    },
  },
};
