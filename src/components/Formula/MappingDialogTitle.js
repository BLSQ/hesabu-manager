import React from "react";
import PropTypes from "prop-types";
import { DialogTitle, Typography } from "@material-ui/core";

const Line = ({ label, item }) =>
  item ? (
    <Typography variant="subtitle1" component="div">
      <span style={{ color: "#666" }}>{label} : </span>
      <b>{item.name}</b>{" "}
      {item.code && (
        <code style={{ color: "#666", userSelect: "all" }}>{item.code}</code>
      )}
    </Typography>
  ) : null;

// what is being mapped : the state (input) or output of a topic (activity)
const MappingDialogTitle = ({ kind, mapped, topic }) => (
  <DialogTitle id="form-dialog-title" disableTypography>
    <Line label={kind} item={mapped} />
    <Line label="Activity" item={topic} />
  </DialogTitle>
);

MappingDialogTitle.propTypes = {
  kind: PropTypes.string.isRequired,
  mapped: PropTypes.object,
  topic: PropTypes.object,
};

export default MappingDialogTitle;
