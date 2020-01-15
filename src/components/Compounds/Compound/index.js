import React from "react";
import {
  Typography,
  Dialog,
  Slide,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent";
import FlatCard from "../../Shared/FlatCard";
import SideSheet from "../../SideSheet";
import SidebarBlock from "../../Shared/SidebarBlock";
import { formattedName } from "../../../utils/textUtils";
import FiltersToggleBtn from "../../FiltersToggleBtn";

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
  const {
    open,
    name,
    formulas,
    loading,
    errorMessage,
    match,
    frequency,
    sideSheetOpen,
    onSideSheetClose,
    onToggleSideSheet,
    sets,
  } = props;
  const handleDelete = () => alert("this is not yet implemented");
  const { t } = useTranslation();
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => history.push("/compounds")}
      TransitionComponent={Transition}
    >
      <TopBar fullscreen backLinkPath="/compounds">
        <Typography variant="h6" color="inherit">
          {loading ? "…" : name}
        </Typography>
        <FiltersToggleBtn
          variant="info"
          className={classes.filtersBtn}
          onClick={onToggleSideSheet}
        />
      </TopBar>
      <PageContent fullscreen>
        {loading && <CircularProgress />}
        {errorMessage && <p>{errorMessage}</p>}
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
      <SideSheet
        title={t("compound.sidesheet.title")}
        open={sideSheetOpen}
        onClose={onSideSheetClose}
      >
        <SidebarBlock title={formattedName(t("resources.set_plural"))}>
          {(sets || []).length && (
            <span>{sets.map(set => (set || {}).id)}</span>
          )}
        </SidebarBlock>
        {frequency && (
          <SidebarBlock title={formattedName(t(`compound.frequency`))}>
            {t(`periodicity.${frequency}`)}
          </SidebarBlock>
        )}
      </SideSheet>
    </Dialog>
  );
};

Compound.propTypes = {
  errorMessage: PropTypes.string,
  formulas: PropTypes.array,
  frequency: PropTypes.string,
  loading: PropTypes.bool,
  match: PropTypes.object,
  name: PropTypes.string,
  onSideSheetClose: PropTypes.func,
  onToggleSideSheet: PropTypes.func,
  open: PropTypes.bool,
  sets: PropTypes.array,
  sideSheetOpen: PropTypes.bool,
};

export default withRouter(Compound);
