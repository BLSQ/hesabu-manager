import React, { useState } from "react";
import { Typography, Dialog, Slide } from "@material-ui/core";
import {
  useHistory,
  useLocation,
  withRouter,
  Route,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import TopBar from "../../components/Shared/TopBar";
import SideSheet from "../../components/SideSheet";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";
import Tabs from "../../components/Sets/Set/Tabs";
import { activeTab } from "../../lib/setHelpers";
import SetChildrenContainer from "../SetChildrenContainer";
import SetCurrentLevelContainer from "../SetCurrentLevelContainer";
import SetFormulasContainer from "../SetFormulasContainer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  appBarHeader: {
    flex: 1,
  },
  dialog: {
    flexDirection: "row",
  },
}));

const SetContainer = props => {
  const classes = useStyles(props);
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);

  const {
    setId,
    open,
    set: { name },
    match,
  } = props;

  const currentTab = activeTab(setId, location.pathname);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  return (
    <Dialog
      fullScreen
      open={open}
      className={classes.root}
      onClose={() => history.push("/sets")}
      TransitionComponent={Transition}
      classes={{
        paperScrollPaper: classes.dialog,
      }}
    >
      <TopBar
        fullscreen
        backLinkPath="/sets"
        tabs={Tabs}
        activeTab={currentTab}
      >
        <Typography
          variant="h6"
          color="inherit"
          className={classes.appBarHeader}
        >
          {name}
        </Typography>
        <FiltersToggleBtn
          variant="info"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <Switch>
        <Route
          path={`${match.url}/current_level`}
          component={SetCurrentLevelContainer}
        />
        <Route
          path={`${match.url}/children`}
          component={SetChildrenContainer}
        />
        <Route
          path={`${match.url}/set_formulas`}
          component={SetFormulasContainer}
        />
      </Switch>
      <SideSheet
        hasTabs
        title={t("set.sidesheet.title")}
        open={sideSheetOpen}
        onClose={handleToggleSideSheet}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          velit et exercitationem ut ex eveniet in sit aperiam, voluptatum
          laboriosam quam voluptate officiis ullam perspiciatis at sint deserunt
          architecto illo!
        </p>
      </SideSheet>
    </Dialog>
  );
};

SetContainer.propTypes = {
  match: PropTypes.object,
  sets: PropTypes.arrayOf(PropTypes.object),
  set: PropTypes.object,
};

const mapStateToProps = () => ({
  // #TODO: Fetch over api
  set: {
    id: "12334",
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["BCZs", "FOSAs"],
    description: "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
  },
});

export default connect(mapStateToProps)(withRouter(SetContainer));
