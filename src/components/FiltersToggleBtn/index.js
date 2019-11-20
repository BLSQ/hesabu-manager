import React from "react";
import { useTranslation } from "react-i18next";
import FilterIcon from "@material-ui/icons/FilterList";
import { Tooltip, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "auto",
  },
}));

const FiltersToggleBtn = props => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  return (
    <Tooltip title={t("tooltips.toggleFilters")}>
      <IconButton
        size="small"
        color="inherit"
        aria-label={t("tooltips.toggleFilters")}
        className={classes.root}
        onClick={props.onClick}
      >
        <FilterIcon />
      </IconButton>
    </Tooltip>
  );
};

FiltersToggleBtn.propTypes = {
  onClick: PropTypes.func,
};

export default FiltersToggleBtn;
