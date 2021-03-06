import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../../constants/ui";

const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles(theme => ({
  hide: {
    left: -drawerWidth,
  },
  content: props => ({
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexGrow: 1,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    minWidth: 0,
    marginLeft: 0, // So the Typography noWrap works
    marginTop: 64 + theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      marginLeft: props.fullscreen ? 0 : drawerWidth,
    },
    paddingBottom: theme.spacing(30),
  }),
  tabsMargin: {
    marginTop: 112 + theme.spacing(3),
  },
}));

function PageContent(props) {
  const { tabs } = props;
  const classes = useStyles(props);
  return (
    <main
      className={classNames(
        classes.content,
        {
          [classes.tabsMargin]: tabs,
        },
        props.className,
      )}
    >
      {props.children}
    </main>
  );
}

PageContent.defaultProps = {
  fullscreen: false,
};
export default PageContent;
