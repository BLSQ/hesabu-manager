import React from "react";
import { makeStyles } from "@material-ui/styles";
import Formulas from "../components/Formula/Formulas";
import { APPBAR_WITH_TABS_HEIGHT } from "../constants/ui";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: APPBAR_WITH_TABS_HEIGHT,
    padding: theme.spacing(2),
  },
}));

const SetZoneContainer = props => {
  const classes = useStyles(props);
  debugger;

  return (
    <div className={classes.root}>
      <Formulas formulas={props.set.zoneFormulas} parent={props.set} />
    </div>
  );
};

SetZoneContainer.propTypes = {};

export default SetZoneContainer;
