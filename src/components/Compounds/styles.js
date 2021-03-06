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
}));

export default useStyles;
