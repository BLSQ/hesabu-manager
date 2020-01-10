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
  },
  cell: {
    padding: theme.spacing(1, 2),
  },
  interactable: {
    "&:hover": {
      background: "#e4e4e4",
      cursor: "pointer",
    },
  },
  is_topic: {
    maxWidth: 200,
    "&:hover": {
      cursor: "default",
      background: "inherit !important",
    },
  },
  is_current: {
    outlineColor: fade(theme.palette.primary.main, 0.1),
    outlineWidth: 5,
    outlineStyle: "auto",
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
