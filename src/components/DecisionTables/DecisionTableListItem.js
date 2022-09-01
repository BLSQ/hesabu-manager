import React from "react";
import { Typography, Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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
  const editPath = `/sets/${setId}/topic/decisions/${decision.id}`;
  const history = useHistory();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography
              className={classes.sectionTitle}
              onClick={() => history.replace(editPath)}
            >
              {decision.name}
            </Typography>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Grid item>{decision.startPeriod || "?"}</Grid>
                <Grid item>
                  <ArrowForwardIcon fontSize="small" />
                </Grid>
                <Grid item>{decision.endPeriod || "?"}</Grid>
              </div>
              {decision.inHeaders.length !== 0 && (
                <div>
                  <i>In:</i> {decision.inHeaders.join(", ")}
                </div>
              )}
              {decision.outHeaders.length !== 0 && (
                <div>
                  <i>Out:</i> {decision.outHeaders.join(", ")}
                </div>
              )}
            </div>
          </Grid>
          <Grid item onClick={() => history.replace(editPath)}>
            <Link>
              <EditIcon fontSize="small" />
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DecisionTableListItem;
