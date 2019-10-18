import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import maskot from "../../images/maskot.svg";

const useStyles = makeStyles(theme => ({
  maskot: {
    marginBottom: theme.spacing(3),
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    transform: "translateY(-100px)",
  },
  content: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const WelcomeMessage = ({ title, text }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <object
        type="image/svg+xml"
        data={maskot}
        aria-label="Dataviz maskot"
        className={classes.maskot}
      />
      <div className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body1" component="p">
          {text}
        </Typography>
      </div>
    </div>
  );
};

export default WelcomeMessage;
