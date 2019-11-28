import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { InfoBox } from "@blsq/manager-ui";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import PageContent from "../Shared/PageContent";
import TopBar from "../Shared/TopBar";
import SetList from "./SetList";
import SideSheet from "../SideSheet";
import FiltersToggleBtn from "../FiltersToggleBtn";
import AppBarSearch from "../AppBarSearch";
import SetContainer from "../../containers/SetContainer";
import useStyles from "./styles";

const Sets = props => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const {
    searchOpen,
    handleToggleSearch,
    query,
    setQuery,
    handleToggleSideSheet,
    sets,
    filteredSets,
    sideSheetOpen,
  } = props;

  const { setId } = useParams();
  const modalOpen = !!setId;

  return (
    <Fragment>
      <TopBar>
        {searchOpen ? (
          <AppBarSearch
            query={query}
            onClose={handleToggleSearch}
            onChange={setQuery}
          />
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
        <SetList sets={filteredSets} noItems={!sets.length} />
        <SetContainer open={modalOpen} setId={setId} />
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

Sets.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object),
};

export default Sets;
