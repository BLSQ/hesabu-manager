export default {
  fr: {
    translations: {
      autocomplete: {
        orgUnits: "Choisissez une unité d’organisation",
      },
      buttons: {
        autoreload: "Rafraichissement auto",
        search: "Rechercher",
        back: "Retour",
        save: "Sauver",
        submit: "Envoyez",
        loading: "En cours",
        seeOnDhis2: "Voir sur dhis2",
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
      periodicity: {
        monthly: "mensuel",
        quarterly: "semestriel",
        yearly: "annuel",
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
        ohNo: "Oh no",
        noSimulationForOrgUnit:
          "Il semble qu’il n’y ai aucun set associé à cette unité d’organisation. Choisissez une autre unité d’organisation ou ajouter celle-ci dans les groupes d’unité d’organisations que vous utilisez pour vos sets.",
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
        new: {
          title:
            "Votre simulation apparaîtra ici une fois que vous aurez soumis le formulaire",
        },
      },
      tooltips: {
        backToDhis2: "Retour à Dhis2",
        toggleFilters: "Montrez / cachez les filtres",
        toggleSearch: "Afficher / masquer la recherche",
        toggleInfo: "Afficher / masquer les infos",
        cell: {
          noData: "Pas de données disponibles",
          input: "Ceci est une entrée. Cliquez pour voir les détails",
          output: "Ceci est une sortie. Cliquez pour voir les détails",
          default: "Cliquez pour voir les détails",
        },
      },
      filtersSheet: {
        title: "Filtres",
        label: "Liste des filtres",
      },
    },
  },
};
