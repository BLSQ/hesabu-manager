import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, withRouter } from "react-router-dom";
import { Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  tabsRoot: {
    marginLeft: theme.spacing(3),
  },
  tabsIndicator: {
    background: "white",
  },
}));

const SharedTabs = ({ match, set, location, tabConfigs }) => {
  const classes = useStyles();
  let activeTab = tabConfigs.findIndex(tab => tab.to === location.pathname);
  if (activeTab === -1) {
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
};

export default withRouter(SharedTabs);
