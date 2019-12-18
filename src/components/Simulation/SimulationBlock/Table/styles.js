import { makeStyles } from "@material-ui/styles";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "auto",
    width: "100%",
  },
  table: {
    width: "95vw",
    "& tr:nth-child(even)": {
      background: "#F5F5F5",
    },
    "& td": {
      border: "none",
    },
    "& th": {
      whiteSpace: "nowrap",
    },
    "& td:hover": {
      background: "#e4e4e4",
      cursor: "pointer",
    },
  },
  is_input: {
    background: fade(yellow[50], 0.5),
    color: yellow[900],
  },
  is_output: {
    background: fade(green[50], 0.5),
    color: green[900],
  },
}));

export default useStyles;
