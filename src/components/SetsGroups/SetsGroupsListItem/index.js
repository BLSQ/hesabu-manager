import { withRouter, Link } from "react-router-dom";
import React from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { HorizontalBulletList } from "@blsq/manager-ui";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import styles from "./styles";

const SetsGroupsListItem = props => {
  const classes = styles();
  const { name, id, createdAt, setsCount } = props;
  return (
    <div className={classes.root}>
      <Typography
        component={Link}
        to={`/sets_groups/${id}/edit`}
        variant="h6"
        className={classes.sectionTitle}
      >
        {name}
      </Typography>
      <HorizontalBulletList className={classes.subheader}>
        <Typography component="li" variant="body2">
          <ReactTimeAgo date={new Date(createdAt)} />
        </Typography>
        <Typography component="li" variant="body2">
          {setsCount} Sets
        </Typography>
      </HorizontalBulletList>
    </div>
  );
};

SetsGroupsListItem.propTypes = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  setsCount: PropTypes.number,
};

export default withRouter(SetsGroupsListItem);
