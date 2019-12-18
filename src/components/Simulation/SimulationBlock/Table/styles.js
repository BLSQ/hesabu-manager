import { makeStyles } from "@material-ui/styles";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "auto",
    width: "100%",
  },
  table: {
    width: "95vw",
    "& td:hover": {
      background: "#efefef",
      cursor: "pointer",
    },
  },
  is_input: {
    background: yellow[50],
    color: yellow[900],
  },
  is_output: {
    background: green[50],
    color: green[900],
  },
}));

export default useStyles;
