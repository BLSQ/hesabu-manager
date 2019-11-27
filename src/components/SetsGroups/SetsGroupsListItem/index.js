import { withRouter, Link } from "react-router-dom";
import React from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { HorizontalBulletList } from "@blsq/manager-ui";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import { useTranslation } from "react-i18next";
import styles from "./styles";

const SetsGroupsListItem = props => {
  const classes = styles();
  const { name, id, createdAt, formulasCount } = props;
  const { t } = useTranslation();

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
          {formulasCount} {t("resources.formula", { count: formulasCount })}
        </Typography>
        <Typography component="li" variant="body2">
          <ReactTimeAgo date={new Date(createdAt)} />
        </Typography>
      </HorizontalBulletList>
    </div>
  );
};

SetsGroupsListItem.propTypes = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  formulasCount: PropTypes.number,
};

export default withRouter(SetsGroupsListItem);
