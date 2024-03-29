import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  infoBox: {
    marginBottom: theme.spacing(4),
  },
  appBarHeader: {
    flex: 1,
  },
  filtersBtn: {
    marginLeft: theme.spacing(1),
  },
  appLinks: {
    marginRight: theme.spacing(2),
  },
  spinner: {
    marginTop: theme.spacing(20),
  },
  dialog: {
    flexDirection: "row",
    overflowX: "hidden",
  },
}));

export default useStyles;
