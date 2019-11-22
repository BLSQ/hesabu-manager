import { withRouter, Link } from "react-router-dom";
import React, { useState } from "react";
import { Chip, Typography, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import styles from "./styles";

const SetListItem = props => {
  const classes = styles();
  const [expanded, setExpanded] = useState(false);
  const { name, description, groupNames: groups, id } = props;
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography
          component={Link}
          to={`/sets/${id}/current_level`}
          variant="h6"
          className={classes.sectionTitle}
        >
          {name}
          {id}
        </Typography>
        <IconButton
          className={classes.expandBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
      {groups.map((group, index) => (
        <Chip
          key={`${index}-group`}
          label={group}
          className={classes.groupChip}
        />
      ))}
      {expanded && (
        <Typography variant="subtitle1" className={classes.description}>
          {description}
        </Typography>
      )}
    </div>
  );
};

SetListItem.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  groupNames: PropTypes.array,
  name: PropTypes.string,
};

SetListItem.defaultProps = {
  groups: [],
};

export default withRouter(SetListItem);
