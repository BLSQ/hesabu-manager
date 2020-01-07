import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "block",
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    borderBottom: "1px solid #efefef",
    position: "relative",
  },
  sectionTitle: theme.link,
  groupChip: {
    marginRight: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "top",
  },
  expandBtn: {
    marginLeft: "auto",
    alignSelf: "flex-start",
  },
}));
