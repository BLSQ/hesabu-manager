import { makeStyles } from "@material-ui/styles";
import { APPBAR_WITH_TABS_HEIGHT, APPBAR_HEIGHT } from "../../constants/ui";

const SIDESHEET_WIDTH = 300;
const SIDESHEET_WIDTH_BIG = 450;

const sideSheetWidth = variant => {
  return variant !== "big" ? SIDESHEET_WIDTH : SIDESHEET_WIDTH_BIG;
};

export default makeStyles(theme => ({
  root: props => ({
    marginRight: props.open ? 0 : -sideSheetWidth(props.variant),
    marginTop: props.hasTabs ? APPBAR_WITH_TABS_HEIGHT : APPBAR_HEIGHT,
    zIndex: 0,
    width: sideSheetWidth(props.variant),
    transition: "margin-right .2s ease-in-out",
    flexShrink: 0,
    padding: theme.spacing(2),
    boxSizing: "border-box",
  }),
  header: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  closeBtn: {
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  content: {
    overflowY: "auto",
    paddingBottom: 100,
  },
}));
