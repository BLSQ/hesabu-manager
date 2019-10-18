import { CircularProgress, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";

import logoUrl from "../images/logo-animated.svg";

const styles = theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    background: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  spinner: {
    color: "gray",
    marginTop: theme.spacing(3),
  },
  logo: {
    width: 200,
  },
  link: {
    color: "white",
  },
});

function LoadingScreen(props) {
  return (
    <div className={props.classes.root}>
      <div className={props.classes.container}>
        <object
          type="image/svg+xml"
          data={logoUrl}
          className={props.classes.logo}
          aria-label="Dataviz logo"
        />
        {props.errored ? (
          <Fragment>
            <p>
              You don’t have any project associated with this app. Please
              contact{" "}
              <a
                className={props.classes.link}
                href="mailto:dataviz@bluesquarehub.com"
              >
                Bluesquare
              </a>
            </p>
            <p>
              Find out more about what Dataviz is{" "}
              <a
                className={props.classes.link}
                href="https://bluesquarehub.com/products/data-viz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </p>
          </Fragment>
        ) : (
          <CircularProgress classes={{ root: props.classes.spinner }} />
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(LoadingScreen);
