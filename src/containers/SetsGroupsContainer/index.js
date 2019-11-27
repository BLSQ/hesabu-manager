import React, { useState } from "react";
import matchSorter from "match-sorter";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SetsGroups from "../../components/SetsGroups";

const SetsContainer = props => {
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const handleToggleSearch = () => setSearchOpen(!searchOpen);

  const filteredSetsGroups = matchSorter(props.setsGroups, query, {
    keys: ["name", "displayName"],
  });

  return (
    <SetsGroups
      filteredSetsGroups={filteredSetsGroups}
      setsGroups={props.setsGroups}
      setQuery={setQuery}
      searchOpen={searchOpen}
      handleToggleSearch={handleToggleSearch}
      sideSheetOpen={sideSheetOpen}
      handleToggleSideSheet={handleToggleSideSheet}
    />
  );
};

SetsContainer.propTypes = {
  setsGroups: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = () => ({
  setsGroups: [
    {
      id: "12334",
      name: "PBF payments CPA for NSHIP",
      formulasCount: 3,
      createdAt: "2019-11-02T18:25:43.511Z",
    },
  ],
});

export default connect(mapStateToProps)(SetsContainer);
