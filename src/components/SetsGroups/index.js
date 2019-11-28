import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { InfoBox } from "@blsq/manager-ui";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import PageContent from "../Shared/PageContent";
import TopBar from "../Shared/TopBar";
import SideSheet from "../SideSheet";
import FiltersToggleBtn from "../FiltersToggleBtn";
import AppBarSearch from "../AppBarSearch";
import useStyles from "./styles";
import SetsGroupsList from "./SetsGroupsList";
import { formattedName } from "../../utils/textUtils";
import SetsGroupContainer from "../../containers/SetsGroupContainer";

const SetsGroups = props => {
  const classes = useStyles(props);
  const { t } = useTranslation();

  const { setsGroupId } = useParams();
  const modalOpen = !!setsGroupId;

  const {
    searchOpen,
    handleToggleSearch,
    setQuery,
    handleToggleSideSheet,
    setsGroups,
    filteredSetsGroups,
    sideSheetOpen,
  } = props;

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
            {formattedName(t("resources.setsGroup_plural"))}
          </Typography>
        )}
        <FiltersToggleBtn onClick={handleToggleSearch} variant="search" />
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
        <SetsGroupsList
          setsGroups={filteredSetsGroups}
          noItems={!setsGroups.length}
        />
        <SetsGroupContainer open={modalOpen} setsGroupId={setsGroupId} />
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

SetsGroups.propTypes = {
  filteredSetsGroups: PropTypes.array,
  handleToggleSearch: PropTypes.func,
  handleToggleSideSheet: PropTypes.func,
  query: PropTypes.string,
  searchOpen: PropTypes.bool,
  setQuery: PropTypes.func,
  setsGroups: PropTypes.array,
  sideSheetOpen: PropTypes.bool,
};

export default SetsGroups;
