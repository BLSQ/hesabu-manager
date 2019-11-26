import React from "react";
import { useTranslation } from "react-i18next";
import BackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/CloseRounded";
import { IconButton, InputBase } from "@material-ui/core";

import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles";

const AppBarSearch = props => {
  const { t } = useTranslation();
  const classes = styles(props);

  return (
    <div className={classNames(classes.root, props.className)}>
      <IconButton
        onClick={props.onClose}
        color="inherit"
        size="small"
        aria-label={t("buttons.back")}
      >
        <BackIcon />
      </IconButton>
      <div className={classes.search}>
        <InputBase
          value={props.query}
          placeholder={t("buttons.search")}
          autoFocus
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={e => {
            props.onChange(e.target.value);
          }}
          inputProps={{
            "aria-label": t("buttons.search"),
          }}
        />
        <IconButton
          onClick={() => {
            props.onChange("");
          }}
          color="inherit"
          size="small"
          aria-label={t("buttons.back")}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

AppBarSearch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  query: PropTypes.string,
};

export default AppBarSearch;
