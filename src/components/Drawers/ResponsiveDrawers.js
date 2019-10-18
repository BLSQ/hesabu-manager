import { Drawer, Hidden, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";

import classNames from "classnames";
import { DRAWER_WIDTH } from "../../constants/ui";
import DrawerItems from "./DrawerItems";

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
  drawerPaper: {
    position: "fixed",
    width: drawerWidth,
    zIndex: 1,
    transition: theme.transitions.create(["left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
});

function ResponsiveDrawers(props) {
  const { classes } = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="left"
          open={props.open}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerItems />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          <DrawerItems />
        </Drawer>
      </Hidden>
    </Fragment>
  );
}

export default withStyles(styles)(ResponsiveDrawers);
