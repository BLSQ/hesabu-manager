import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <Typography className={classes.sectionTitle}>
            {change.event} : {change.itemType} - {change.itemId}
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
              <div style={{ minWidth: "300px" }}>{details.diff[0]}</div>
              <div dangerouslySetInnerHTML={{ __html: details.html }} />
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
