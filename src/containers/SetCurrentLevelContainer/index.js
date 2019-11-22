import React from "react";
import { makeStyles } from "@material-ui/styles";
import { APPBAR_WITH_TABS_HEIGHT } from "../../constants/ui";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: APPBAR_WITH_TABS_HEIGHT,
    padding: theme.spacing(2),
  },
}));

const SetCurrentLevelContainer = props => {
  const classes = useStyles(props);

  return <div className={classes.root}>CurrentLevelContainer</div>;
};

SetCurrentLevelContainer.propTypes = {};

export default SetCurrentLevelContainer;
