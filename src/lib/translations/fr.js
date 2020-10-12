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
        edit: "Modifier",
        delete: "Effacer",
        reload: "Recharger",
        close: "Fermer",
        last: "Dernier",
        next: "Suivant",
        skip: "Passer",
      },
      filters: {
        mockedValues: "Valeurs factices",
      },
      compound: {
        frequency: "Fréquence",
        sidesheet: {
          title: "Compound info",
        },
        sets: "Sets",
      },
      noData: "N/D",
      emptySection: {
        title: "Vous n'avez aucun.e {{resourceName}}",
        body: "Créez-en et ils apparaîtront ici.",
      },
      drawerItems: {
        help: {
          main: "Aide",
          shortcuts: "Racourcis",
        },
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
        quarterly: "trimestriel",
        yearly: "annuel",
      },
      resources: {
        set: "set",
        set_plural: "sets",
        orgUnitGroup: "Groupe d’unité d’organisation",
        orgUnitGroup_plural: "Groupes d’unité d’organisation",
        orgUnitGroupSet: "Set de groupes d’unité d’organisation",
        orgUnitGroupSet_plural: "Sets de groupes d’unité d’organisation",
        compound: "compound",
        compound_plural: "compounds",
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
        frequency: "Fréquence",

        tabs: {
          topicFormulas: {
            label: "Topic",
            tooltip: "Mapping des entrées et des formules par Topic ",
          },
          setFormulas: {
            label: "Formules du Set",
            tooltip: "Aggrégation des formules liées aux Topics",
          },
          childrenFormulas: {
            label: "Formules des Enfants",
            tooltip: "If multi-entity groupset package. Prefer zone package",
          },
          zoneFormulas: {
            label: "Formules de la Zone",
            tooltip:
              "Aggrégation au niveau de l'entité principale/zone des formules du Set des entités cibles ",
          },
          zoneTopicFormulas: {
            label: "Formules de la Zone par topic",
            tooltip:
              "Aggrégation par topic au niveau de l'entité principale/zone par topic sur les entités cibles",
          },
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
          title: "Vous n’avez pas encore de simulation avec ces paramètres",
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
      snackBars: {
        reloadPage:
          "Une nouvelle version est disponible! Rafraichissez la page.",
      },
      shortcuts: {
        title: "Aide — Raccourcis",
        intro:
          "Pas beaucoup de raccourcis pour l'instant mais ceux-ci devraient déjà accélérer votre navigation:",
      },
      tours: {
        welcome: {
          title: "Bienvenue sur Hesabu ßeta!",
          content:
            "Afin de mieux refléter la diversité de nos projets, nous avons opté pour une nouvelle nomenclature par rapport à l’ancien hesabu. Ce tour d’introduction passera en revue ces nouveaux concept. La correspondance exacte des terme pourra être trouvée dans la section aide.",
          sets: {
            title: "Les sets",
            content:
              "Les sets sont des ensembles de sujets. Chaque ensemble produira un ou deux tableaux lors de la simulation en fonction de son type. Vous pouvez y utiliser des intrants de source diverses pour nourir des formules qui pourront ensuite être exportées vers dhis2 et/ou réutilisées dans des compounds.",
          },
          compounds: {
            title: "Les compounds",
            content:
              "Les compounds permettent de créer et grouper de nouvelles formules en combinant des formules existantes provenant de plusieurs sets differents.",
          },
          simulations: {
            title: "Les simulations",
            content:
              "Pour le moment les simulations sont toujours limitée à une unité d’organisation et une période. Par contre elles peuvent désormais s’auto-recharger. Cela vous permettra de d’automatiquement recréer une simulation dès que vous opérez un changement sur votre set ou compound.",
          },
        },
      },
    },
  },
};
