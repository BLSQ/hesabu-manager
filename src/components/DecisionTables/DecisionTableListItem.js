import React, { useState } from "react";
import { Typography, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    borderBottom: "1px solid #efefef",
    position: "relative",
  },
  sectionTitle: {
    ...theme.link,
    marginBottom: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "top",
  },
}));

const DecisionTableListItem = ({ decision }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography className={classes.sectionTitle}>
              {decision.name}
            </Typography>
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton aria-label="edit user" component="label">
              <EditIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DecisionTableListItem;
