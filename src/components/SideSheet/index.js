import React from "react";
import { Typography, IconButton, Drawer } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./styles";

const SideSheet = props => {
  const classes = styles(props);
  const { t } = useTranslation();
  return (
    <Drawer
      className={classes.root}
      classes={{
        paper: classes.root,
      }}
      variant="permanent"
      anchor="right"
      role="complementary"
      aria-label={t("filtersSheet.label")}
    >
      <header className={classes.header}>
        {props.title && <Typography variant="h6">{props.title}</Typography>}
        <IconButton
          size="small"
          className={classes.closeBtn}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
      </header>
      <section className={classes.content}>{props.children}</section>
    </Drawer>
  );
};

SideSheet.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func,
};

export default SideSheet;
