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
import { formattedName } from "../../utils/textUtils";
import SetsFilters from "./SetsFilters";
import SectionLoading from "../Shared/SectionLoading";

const Sets = props => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const {
    loading,
    searchOpen,
    handleToggleSearch,
    query,
    setQuery,
    handleToggleSideSheet,
    sets,
    filteredSets,
    sideSheetOpen,
    errorMessage,
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
            {formattedName(t("resources.set_plural"))}
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
        {loading && <SectionLoading />}
        {!loading && (
          <InfoBox name="hesabu-sets-infobox" className={classes.infoBox}>
            {t("sets.index.infoBox")}
          </InfoBox>
        )}
        {errorMessage && (
          <InfoBox name="sets-fetch-errors" dismissable={false}>
            {errorMessage}
          </InfoBox>
        )}
        <SetList sets={filteredSets} noItems={!sets.length} loading={loading} />
        <SetContainer open={modalOpen} setId={setId} />
      </PageContent>
      <SideSheet
        title={t("filtersSheet.title")}
        open={sideSheetOpen}
        onClose={handleToggleSideSheet}
      >
        <SetsFilters sets={sets} />
      </SideSheet>
    </Fragment>
  );
};

Sets.propTypes = {
  errorMessage: PropTypes.string,
  filteredSets: PropTypes.array,
  handleToggleSearch: PropTypes.func,
  handleToggleSideSheet: PropTypes.func,
  loading: PropTypes.bool,
  query: PropTypes.string,
  searchOpen: PropTypes.bool,
  setQuery: PropTypes.func,
  sets: PropTypes.arrayOf(PropTypes.object),
  sideSheetOpen: PropTypes.bool,
};

export default Sets;
