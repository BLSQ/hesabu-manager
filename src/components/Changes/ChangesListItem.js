import React, { useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ErrorBoundary from "../Shared/ErrorBoundary";
import VisualDiff from "./Diff";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
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
    flexDirection: "column",
    alignItems: "top",
  },
}));

const ChangesListItem = ({ change, translateToUser }) => {
  const classes = useStyles();

  const determineStyle = changeType => {
    switch (changeType) {
      case "update":
        return "inherit";
      case "create":
        return "green";
      case "destroy":
        return "red";
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <Typography className={classes.sectionTitle}>
            <span style={{ color: determineStyle(change.event) }}>
              {change.event}
            </span>{" "}
            : {change.itemType} - {change.itemId}
          </Typography>
        </div>

        <div
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {change.diffs.map(details => (
            <div style={{ gap: "20px", display: "flex" }}>
              <div style={{ minWidth: "300px" }}>{details.field}</div>
              <Grid justifyContent={"space-between"} spacing={2} container>
                <ErrorBoundary>
                  <VisualDiff details={details} />
                </ErrorBoundary>
              </Grid>
            </div>
          ))}
        </div>
        <div style={{ marginLeft: "40px", marginTop: "40px" }}>
          {change.author && (
            <div>
              {change.author.email && (
                <>
                  by <b>{change.author.email}</b> at <i>{change.createdAt}</i>
                </>
              )}
            </div>
          )}
          {!change.author && (
            <>
              by <b>{translateToUser(change.whodunnit)}</b> at{" "}
              <i>{change.createdAt}</i>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangesListItem;
