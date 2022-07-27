import { Link, withRouter } from "react-router-dom";
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
  const { match, set, location, tabConfigs } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  let activeTab = tabConfigs.findIndex(tab => tab.to == location.pathname);

  if (activeTab == -1) {
    activeTab = 0;
  }

  return (
    <Tabs
      value={activeTab}
      classes={{
        root: classes.tabsRoot,
        indicator: classes.tabsIndicator,
      }}
    >
      {tabConfigs.map(tabConfig => (
        <Tab key={tabConfig.to} component={Link} {...tabConfig} />
      ))}
    </Tabs>
  );
}

export default withRouter(SetTabs);
