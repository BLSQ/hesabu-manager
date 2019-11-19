import React, { Fragment, useState } from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { InfoBox } from "@blsq/manager-ui";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import PageContent from "../../components/Shared/PageContent";
import TopBar from "../../components/Shared/TopBar";
import SetList from "../../components/Sets/SetList";
import SideSheet from "../../components/SideSeet";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";

const useStyles = makeStyles(theme => ({
  infoBox: {
    marginBottom: theme.spacing(4),
  },
}));

const SetsContainer = props => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {t("drawerItems.sets")}
        </Typography>
        <FiltersToggleBtn onClick={handleToggleSideSheet} />
      </TopBar>
      <PageContent>
        <InfoBox className={classes.infoBox}>
          Sets are the blocks of your final report. Each set will output{" "}
          <strong>one or two tables</strong> depending on the type. If you want
          to make computations with data from multiple sets, create project
          formulas and they will appear at the end of your report. At any
          moment, you can see a representation of the report in the{" "}
          <strong>simulations page</strong>.
        </InfoBox>
        <SetList sets={props.sets} />
      </PageContent>
      <SideSheet
        title={t("filtersSheet.title")}
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
    </Fragment>
  );
};

SetsContainer.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = () => ({
  sets: [
    {
      name: "SIGL BCZ FOSA Coherence",
      groupNames: ["BCZs", "FOSAs"],
      description:
        "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
    },
    {
      name: "SIGL BCZ FOSA Coherence",
      groupNames: ["BCZs", "FOSAs"],
      description:
        "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
    },
    {
      name: "SIGL BCZ FOSA Coherence",
      groupNames: ["FOSAs"],
      description:
        "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
    },
  ],
});

export default connect(mapStateToProps)(SetsContainer);
