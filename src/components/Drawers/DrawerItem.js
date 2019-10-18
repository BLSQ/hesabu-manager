import { ListItem, withStyles } from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";

import React from "react";
import classNames from "classnames";

const styles = () => ({
  currentSection: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

function DrawerItem(props) {
  const { classes } = props;
  const active = props.to.match(props.location.pathname.split("/")[1]);
  const CustomLink = React.forwardRef((props, _ref) => <NavLink {...props} />);
  return (
    <ListItem
      button
      component={CustomLink}
      to={props.to}
      classes={{
        button: classNames({ [classes.currentSection]: active }),
      }}
    >
      {props.children}
    </ListItem>
  );
}

export default withStyles(styles)(withRouter(DrawerItem));
