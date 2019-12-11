import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "auto",
    width: "100%",
  },
  table: {
    width: "96vw",
    "& td:hover": {
      background: "#efefef",
      cursor: "pointer",
    },
  },
}));

export default useStyles;
