import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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

const ChangesListItem = ({ change }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Grid container justifyContent="space-between" spacing={4}>
          <Grid item>
            <Typography className={classes.sectionTitle}>
              {change.event} : {change.itemType} - {change.itemId}
            </Typography>
            <Grid container spacing={2}>
              <Grid item>Updated field: {change.diffs[0].diff[0]}</Grid>
              <Grid item>
                Insert: {change.diffs[0].diff[1].table.diff.raw[0].insert}
              </Grid>
              {change.diffs[0].diff[1].table.diff.raw[0].delete && (
                <Grid item>
                  Delete: {change.diffs[0].diff[1].table.diff.raw[0].delete}
                </Grid>
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <div
                  dangerouslySetInnerHTML={{ __html: change.diffs[0].html }}
                ></div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          {change.author && (
            <Grid item>
              {change.author.email && (
                <>
                  Author: {change.author.email} DHIS2 ref:{" "}
                  {change.author.dhis2_user_ref}
                </>
              )}
              {!change.author.email && <>DHIS2 ref: {change.author}</>}
            </Grid>
          )}
          {!change.author && (
            <Grid item>
              {" "}
              <b>Author:</b> system <b>DHIS2 ref:</b> {change.whodunnit}{" "}
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default ChangesListItem;
