import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  infoBox: {
    marginBottom: theme.spacing(4),
  },
  tabs: {
    borderBottom: "1px solid #efefef",
    margin: theme.spacing(0, -3, 4, -3),
    padding: theme.spacing(0, 3, 0, 3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
