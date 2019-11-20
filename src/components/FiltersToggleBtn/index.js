import React from "react";
import { useTranslation } from "react-i18next";
import FilterIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
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
  const isSearch = props.variant === "search";

  return (
    <Tooltip
      title={
        isSearch ? t("tooltips.toggleSearch") : t("tooltips.toggleFilters")
      }
    >
      <IconButton
        size="small"
        color="inherit"
        aria-label={
          isSearch ? t("tooltips.toggleSearch") : t("tooltips.toggleFilters")
        }
        className={classNames(classes.root, props.className)}
        onClick={props.onClick}
      >
        {isSearch ? <SearchIcon /> : <FilterIcon />}
      </IconButton>
    </Tooltip>
  );
};

FiltersToggleBtn.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

export default FiltersToggleBtn;
