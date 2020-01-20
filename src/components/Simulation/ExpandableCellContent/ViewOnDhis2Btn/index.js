import React from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Dhis2Icon } from "@blsq/manager-ui";

import camelCase from "lodash/camelCase";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const ViewOnDhis2Btn = props => {
  const { cell } = props;
  const classes = useStyles(props);
  const { t } = useTranslation();

  const isInput = !!cell.state;
  const isOutput = !!cell.dhis2_data_element;
  let href;

  if (!isInput && !isOutput) {
    return null;
  }

  if (isInput) {
    href = `${
      process.env.REACT_APP_DHIS2_URL
    }dhis-web-maintenance/index.html#/edit/${camelCase(
      cell.state.kind,
    )}Section/${camelCase(cell.state.kind)}/${cell.state.ext_id}`;
  }

  if (isOutput) {
    href = `${process.env.REACT_APP_DHIS2_URL}/dhis-web-maintenance/index.html#/edit/dataElementSection/dataElement/${cell.dhis2_data_element}`;
  }

  return (
    <Button
      tag="a"
      href={href}
      color="primary"
      target="_blank"
      className={classes.root}
    >
      <Dhis2Icon className={classes.icon} />
      {t("buttons.seeOnDhis2")}
    </Button>
  );
};

ViewOnDhis2Btn.propTypes = {
  cell: PropTypes.object,
};

export default ViewOnDhis2Btn;
