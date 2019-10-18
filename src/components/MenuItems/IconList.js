import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ICONS } from "../../constants/ui";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: theme.spacing(3),
  },
  iconBox: {
    width: "70px",
    height: "70px",
    minWidth: "70px",
    boxSizing: "border-box",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "50%",
    "&:hover": {
      background: "#efefef",
      cursor: "pointer",
    },
  },
  iconsContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  code: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  active: {
    background: "#efefef",
  },
}));

function IconList(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.iconsContainer}>
      {ICONS.map((icon, index) => (
        <div
          onClick={() => props.setFieldValue("menuItem.iconName", icon)}
          className={classNames(
            {
              [classes.active]: props.values.menuItem.iconName === icon,
            },
            classes.iconBox,
          )}
          key={index}
        >
          <i className={classNames(`fa fa-${icon}`, classes.icon)} />
        </div>
      ))}
    </div>
  );
}

export default IconList;
