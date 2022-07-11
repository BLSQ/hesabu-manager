import { withRouter, Link } from "react-router-dom";
import React from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { HorizontalBulletList } from "@blsq/manager-ui";
import { useTranslation } from "react-i18next";
import styles from "./styles";
import { formattedName } from "../../../utils/textUtils";

const CompoundsListItem = props => {
  const classes = styles();
  const { name, id, formulas, frequency, sets } = props;
  const { t } = useTranslation();
  return (
    <div className={classes.root}>
      <Typography
        component={Link}
        to={`/compounds/${id}/compound_formulas`}
        variant="subtitle1"
        className={classes.sectionTitle}
      >
        {name}
      </Typography>
      <HorizontalBulletList className={classes.subheader}>
        <Typography component="li" variant="body2">
          {formattedName(t(`periodicity.${frequency}`))}
        </Typography>
        <Typography
          component="li"
          variant="body2"
          title={formulas.map(s => s.code).join("\n")}
        >
          {formulas.length} {t("resources.formula", { count: formulas.length })}
        </Typography>
        <Typography
          component="li"
          variant="body2"
          title={sets
            .map(s => s.name)
            .sort()
            .join("\n")}
        >
          {formulas.length} {t("resources.set", { count: sets.length })}
        </Typography>
      </HorizontalBulletList>
    </div>
  );
};

CompoundsListItem.propTypes = {
  createdAt: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  formulasCount: PropTypes.number,
};

export default withRouter(CompoundsListItem);
