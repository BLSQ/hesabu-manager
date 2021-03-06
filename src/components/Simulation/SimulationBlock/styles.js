import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "&:last-of-type": {
      paddingBottom: 320,
    },
  },
  hidden: {
    display: "none",
  },
  tabs: {
    borderBottom: "1px solid #efefef",
    margin: theme.spacing(0, -3, 4, -3),
    padding: theme.spacing(0, 3, 0, 3),
  },
}));

export default useStyles;
