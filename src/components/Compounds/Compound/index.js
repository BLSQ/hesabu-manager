import React from "react";
import { Typography, Dialog, Slide, makeStyles } from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent";
import FlatCard from "../../Shared/FlatCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  formulaWrapper: {
    display: "flex",
    flexWrap: "wrap",
    "& > div": {
      margin: theme.spacing(0, 2, 2, 0),
    },
  },
}));

const Compound = props => {
  const history = useHistory();
  const classes = useStyles();
  const { open, name, formulas, match } = props;
  const handleDelete = () => alert("this is not yet implemented");

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => history.push("/compounds")}
      TransitionComponent={Transition}
    >
      <TopBar fullscreen backLinkPath="/compounds">
        <Typography variant="h6" color="inherit">
          {name}
        </Typography>
      </TopBar>
      <PageContent fullscreen>
        <div className={classes.formulaWrapper}>
          {(formulas || []).map((formula, i) => (
            <FlatCard
              key={`formula-${i}`}
              to={`${match.url}/edit`}
              onDelete={handleDelete}
            >
              {formula.description}
            </FlatCard>
          ))}
        </div>
      </PageContent>
    </Dialog>
  );
};

Compound.propTypes = {
  formulas: PropTypes.array,
  match: PropTypes.object,
  name: PropTypes.string,
  open: PropTypes.bool,
};

export default withRouter(Compound);
