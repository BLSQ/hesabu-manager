import { Link, withRouter } from "react-router-dom";
import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  tabsRoot: {
    marginLeft: theme.spacing(3),
  },
  tabsIndicator: {
    background: "white",
  },
}));

const CompoundTabs = ({ match, set, location, tabConfigs }) => {
  const classes = useStyles();
  let activeTab = tabConfigs.findIndex(tab => tab.to === location.pathname);
  debugger;
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

export default withRouter(CompoundTabs);
