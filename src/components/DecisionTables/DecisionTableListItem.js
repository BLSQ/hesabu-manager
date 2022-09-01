import React from "react";
import { Typography, Link, Grid } from "@material-ui/core";
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
    marginLeft: theme.spacing(1),
  },
  header: {
    display: "flex",
    alignItems: "top",
  },
  gridItemPadding: {
    padding: theme.spacing(1),
  },
}));

const DecisionTableListItem = ({ setId, decision }) => {
  const classes = useStyles();
  const editPath = `./index.html#/sets/${setId}/topic/decisions/${decision.id}`;
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography className={classes.sectionTitle}>
              {decision.name}
            </Typography>
            <Grid container>
              <Grid className={classes.gridItemPadding} item>
                Starts: {decision.startPeriod}
              </Grid>
              <Grid className={classes.gridItemPadding} item>
                Ends: {decision.endPeriod}
              </Grid>
            </Grid>
            <Grid container>
              {decision.inHeaders.length !== 0 && (
                <Grid className={classes.gridItemPadding} item>
                  In: {decision.inHeaders.join(", ")}
                </Grid>
              )}
              {decision.outHeaders.length !== 0 && (
                <Grid className={classes.gridItemPadding} item>
                  Out: {decision.outHeaders.join(", ")}
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Link href={editPath}>
              <EditIcon fontSize="small" />
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DecisionTableListItem;
