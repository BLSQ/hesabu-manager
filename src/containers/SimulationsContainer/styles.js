import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: 999,
    },
    drawer: {
      width: "200px",
      flexShrink: 0,
    },
    drawerPaper: {
      zIndex: 100,
      width: "200px",
      paddingLeft: theme.spacing(2),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbarExtra: {
      marginBottom: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }))

  export default useStyles;
