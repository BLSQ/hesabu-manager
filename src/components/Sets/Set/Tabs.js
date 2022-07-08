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
  const { activeTab, match } = props;
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
        label={t("set.tabs.topicFormulas.label")}
        title={t("set.tabs.topicFormulas.tooltip")}
        component={Link}
        to={`${match.url}/topic_formulas`}
      />
      <Tab
        label={t("set.tabs.setFormulas.label")}
        title={t("set.tabs.setFormulas.tooltip")}
        component={Link}
        to={`${match.url}/set_formulas`}
      />
      <Tab
        label={t("set.tabs.childrenFormulas.label")}
        title={t("set.tabs.childrenFormulas.tooltip")}
        component={Link}
        to={`${match.url}/children`}
      />
      <Tab
        label={t("set.tabs.zoneTopicFormulas.label")}
        title={t("set.tabs.zoneTopicFormulas.tooltip")}
        component={Link}
        to={`${match.url}/zone_topic`}
      />
      <Tab
        label={t("set.tabs.zoneFormulas.label")}
        title={t("set.tabs.zoneFormulas.tooltip")}
        component={Link}
        to={`${match.url}/zone_formulas`}
      />
    </Tabs>
  );
}

export default withRouter(SetTabs);
