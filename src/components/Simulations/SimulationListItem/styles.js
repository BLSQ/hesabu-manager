import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "block",
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    borderBottom: "1px solid #efefef",
    position: "relative",
  },
  groupChip: {
    marginRight: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  sectionTitle: theme.link,
}));
