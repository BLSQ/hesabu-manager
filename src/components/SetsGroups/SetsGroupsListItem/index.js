import { withRouter, Link } from "react-router-dom";
import React from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { HorizontalBulletList } from "@blsq/manager-ui";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import { useTranslation } from "react-i18next";
import styles from "./styles";
import { formattedName } from "../../../utils/textUtils";

const SetsGroupsListItem = props => {
  const classes = styles();
  const { name, id, formulas, frequency } = props;
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Typography
        component={Link}
        to={`/sets_groups/${id}`}
        variant="subtitle1"
        className={classes.sectionTitle}
      >
        {name}
      </Typography>
      <HorizontalBulletList className={classes.subheader}>
        <Typography component="li" variant="body2">
          {formattedName(t(`periodicity.${frequency}`))}
        </Typography>
        <Typography component="li" variant="body2">
          {formulas.length} {t("resources.formula", { count: formulas.length })}
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
