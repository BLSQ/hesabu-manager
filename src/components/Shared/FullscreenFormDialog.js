import {
  AppBar,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import React from "react";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  flex: {
    flex: 1,
  },
  content: {
    marginTop: 64 + theme.spacing(3),
  },
  paper: {
    background: "#fafafa",
  },
});

function FullscreenFormDialog(props) {
  const { classes, backLink } = props;
  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={props.open}
      classes={{ paper: classes.paper }}
    >
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Close"
            component={Link}
            to={backLink}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" className={classes.content}>
        <Grid item xs={12} lg={8}>
          {props.children}
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default withStyles(styles)(FullscreenFormDialog);
