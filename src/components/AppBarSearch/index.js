import React from "react";
import { useTranslation } from "react-i18next";
import BackIcon from "@material-ui/icons/ArrowBack";
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
          placeholder={t("buttons.search")}
          autoFocus
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={e => {
            props.onChange(e.target.value);
          }}
          inputProps={{ "aria-label": t("buttons.search") }}
        />
      </div>
    </div>
  );
};

AppBarSearch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
};

export default AppBarSearch;
