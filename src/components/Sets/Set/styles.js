import { makeStyles } from "@material-ui/core/styles";
import { SIDEBAR_WIDTH } from "../../../constants/ui";

export default makeStyles(theme => ({
  appBarHeader: {
    flex: 1,
  },
  dialog: {
    flexDirection: "row",
  },
  simulationBtn: sideSheetOpen => ({
    right: sideSheetOpen ? SIDEBAR_WIDTH + theme.spacing(4) : theme.spacing(4),
    transition: "all .1s 100ms ease-in-out",
  }),
}));
