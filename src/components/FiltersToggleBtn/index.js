import React from "react";
import { useTranslation } from "react-i18next";
import FilterIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import InfoIcon from "@material-ui/icons/Info";
import { Tooltip, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import classNames from "classnames";

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: "auto",
    alignSelf: "flex-start",
  },
}));

const FiltersToggleBtn = props => {
  const { t } = useTranslation();
  const classes = useStyles(props);
  const config = {
    search: {
      label: t("tooltips.toggleSearch"),
      icon: <SearchIcon />,
    },
    filters: {
      label: t("tooltips.toggleFilters"),
      icon: <FilterIcon />,
    },
    info: {
      label: t("tooltips.toggleInfo"),
      icon: <InfoIcon />,
    },
  };
  const currentConfig = config[props.variant];

  return (
    <Tooltip title={currentConfig.label}>
      <IconButton
        size="small"
        color="inherit"
        aria-label={currentConfig.label}
        className={classNames(classes.root, props.className)}
        onClick={props.onClick}
      >
        {currentConfig.icon}
      </IconButton>
    </Tooltip>
  );
};

FiltersToggleBtn.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

export default FiltersToggleBtn;
