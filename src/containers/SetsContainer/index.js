import React, { useState } from "react";
import matchSorter from "match-sorter";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Sets from "../../components/Sets";

const SetsContainer = props => {
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const handleToggleSearch = () => setSearchOpen(!searchOpen);

  const filteredSets = matchSorter(props.sets, query, {
    keys: ["name", "displayName"],
  });

  return (
    <Sets
      filteredSets={filteredSets}
      sets={props.sets}
      query={query}
      setQuery={setQuery}
      searchOpen={searchOpen}
      handleToggleSearch={handleToggleSearch}
      sideSheetOpen={sideSheetOpen}
      handleToggleSideSheet={handleToggleSideSheet}
    />
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
