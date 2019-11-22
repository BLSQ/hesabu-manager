import React from "react";
import { useTranslation } from "react-i18next";
import FilterIcon from "@material-ui/icons/FilterList";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import { APPBAR_WITH_TABS_HEIGHT } from "../../constants/ui";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: APPBAR_WITH_TABS_HEIGHT,
    padding: theme.spacing(2),
  },
}));

const SetCurrentLevelContainer = props => {
  const { t } = useTranslation();
  const classes = useStyles(props);

  return <div className={classes.root}>CurrentLevelContainer</div>;
};

SetCurrentLevelContainer.propTypes = {};

export default SetCurrentLevelContainer;
