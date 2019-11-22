import React, { Fragment, useState } from "react";
import matchSorter from "match-sorter";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { InfoBox } from "@blsq/manager-ui";
import PropTypes from "prop-types";
import PageContent from "../../components/Shared/PageContent";
import TopBar from "../../components/Shared/TopBar";
import SetList from "../../components/Sets/SetList";
import SideSheet from "../../components/SideSheet";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";
import AppBarSearch from "../../components/AppBarSearch";
import SetContainer from "../SetContainer";
import useStyles from "./styles";

const SetsContainer = props => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const handleToggleSearch = () => setSearchOpen(!searchOpen);

  const filteredSets = matchSorter(props.sets, query, {
    keys: ["name", "displayName"],
  });

  return (
    <Fragment>
      <TopBar>
        {searchOpen ? (
          <AppBarSearch onClose={handleToggleSearch} onChange={setQuery} />
        ) : (
          <Typography
            variant="h6"
            color="inherit"
            className={classes.appBarHeader}
          >
            {t("drawerItems.sets")}
          </Typography>
        )}
        <FiltersToggleBtn
          className={classes.filtersBtn}
          onClick={handleToggleSearch}
          variant="search"
        />
        <FiltersToggleBtn
          variant="filters"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <PageContent>
        <InfoBox name="hesabu-sets-infobox" className={classes.infoBox}>
          {t("sets.index.infoBox")}
        </InfoBox>
        <SetList sets={filteredSets} noItems={!props.sets.length} />
        <SetContainer />
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
      id: "12334",
      name: "SIGL BCZ FOSA Coherence",
      groupNames: ["BCZs", "FOSAs"],
      description:
        "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
    },
    {
      id: "12334",
      name: "SIGL BCZ FOSA Coherence",
      groupNames: ["BCZs", "FOSAs"],
      description:
        "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
    },
    {
      id: "12334",
      name: "SIGL BCZ FOSA Coherence",
      groupNames: ["FOSAs"],
      description:
        "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
    },
  ],
});

export default connect(mapStateToProps)(SetsContainer);
