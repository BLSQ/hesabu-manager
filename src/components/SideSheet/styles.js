import { makeStyles } from "@material-ui/styles";

const SIDESHEET_WIDTH = 300;

export default makeStyles(theme => ({
  root: props => ({
    marginRight: props.open ? 0 : -SIDESHEET_WIDTH,
    marginTop: 64,
    zIndex: 0,
    width: SIDESHEET_WIDTH,
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
