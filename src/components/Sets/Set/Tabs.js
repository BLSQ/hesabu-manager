import { Link, withRouter, useRouteMatch } from "react-router-dom";
import { Tab, Tabs } from "@material-ui/core";

import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  tabsRoot: {
    marginLeft: theme.spacing(3),
  },
  tabsIndicator: {
    background: "white",
  },
}));

function SetTabs(props) {
  const { activeTab, match } = props;
  const routeMatch = useRouteMatch("/sets/:setId");
  const setId = routeMatch && (routeMatch.params || {}).setId;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Tabs
      value={activeTab}
      classes={{
        root: classes.tabsRoot,
        indicator: classes.tabsIndicator,
      }}
    >
      <Tab
        label={t("set.tabs.currentLevel")}
        component={Link}
        to={`${match.url}/${setId}/current_level`}
      />
      <Tab
        label={t("set.tabs.children")}
        component={Link}
        to={`${match.url}/${setId}/children`}
      />
      <Tab
        label={t("set.tabs.setFormulas")}
        component={Link}
        to={`${match.url}/${setId}/set_formulas`}
      />
    </Tabs>
  );
}

export default withRouter(SetTabs);
