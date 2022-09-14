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

const diffModes = ["diffSentences", "diffChars", "diffWords", "diffLines"];

const ChangesListItem = ({ change, translateToUser }) => {
  const classes = useStyles();
  const Diff = require("diff");

  const [diffModeIndex, setDiffModeIndex] = useState(0);

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
                  <VisualDiff
                    details={details}
                    diffMode={diffModes[diffModeIndex]}
                  />
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
        <div style={{ width: "100%", marginLeft: "50rem" }}>
          <Button
            variant={"outlined"}
            onClick={() =>
              setDiffModeIndex((diffModeIndex + 1) % diffModes.length)
            }
          >
            {" "}
            Change diff view{" "}
          </Button>
          <div style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}>
            <small>
              {" "}
              <b>Current:</b> {diffModes[diffModeIndex]}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangesListItem;
