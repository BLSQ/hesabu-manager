import React from "react";
import { makeStyles } from "@material-ui/styles";
import Icon from "@material-ui/icons/InfoTwoTone";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    background: "#efefef",
    padding: theme.spacing(2),
    paddingLeft: 0,
    display: "flex",
    borderRadius: 4,
    marginBottom: theme.spacing(2),
  },
  icon: {
    width: 50,
    color: theme.palette.primary.main,
  },
  content: {
    flex: 1,
  },
}));
const InfoBox = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Icon className={classes.icon} />
      <Typography
        variant="body2"
        component="div"
        color="primary"
        className={classes.content}
      >
        {props.children || props.text}
      </Typography>
    </div>
  );
};

export default InfoBox;
