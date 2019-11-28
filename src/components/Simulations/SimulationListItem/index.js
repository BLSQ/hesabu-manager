import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Chip, Typography } from "@material-ui/core";
import classNames from "classnames";
import LinkIcon from "@material-ui/icons/Link";
import PropTypes from "prop-types";
import ReactTimeAgo from "react-time-ago";
import humanizeDuration from "humanize-duration";
import { DuoToneChip, HorizontalBulletList } from "@blsq/manager-ui";
import useStyles from "./styles";

const humanDuration = seconds => {
  return humanizeDuration(seconds * 1000);
};

const SimulationListItem = props => {
  const classes = useStyles();
  const {
    id,
    name: title,
    createdAt,
    buildDuration,
    groupNames: groups,
    period,
  } = props;

  return (
    <div className={classes.root}>
      <Typography
        variant="h6"
        component={Link}
        to={`/simulations/${id}`}
        className={classes.sectionTitle}
      >
        {title}
      </Typography>
      <HorizontalBulletList className={classes.subtitle}>
        <Typography component="li" variant="body2">
          <ReactTimeAgo date={createdAt} />
        </Typography>
        <Typography component="li" variant="body2">
          {humanDuration(buildDuration)}
        </Typography>
      </HorizontalBulletList>
      <DuoToneChip
        label={groups.join(", ")}
        color="primary"
        avatar={<LinkIcon />}
        className={classNames(classes.groupChip, classes.chips)}
      />
      <Chip
        label={period}
        className={classNames(classes.periodChip, classes.chips)}
      />
    </div>
  );
};

SimulationListItem.propTypes = {
  buildDuration: PropTypes.number,
  createdAt: PropTypes.string,
  groups: PropTypes.array,
  id: PropTypes.string,
  period: PropTypes.string,
  title: PropTypes.string,
};

export default withRouter(SimulationListItem);
