import React, { useState, useEffect } from "react";
import matchSorter from "match-sorter";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { externalApi } from "../../actions/api";
import Sets from "../../components/Sets";
import { deserialize } from "../../utils/jsonApiUtils";
import intersectionBy from "lodash/intersectionBy";
const SetsContainer = () => {
  const [sideSheetOpen, setSideSheetOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    setLoading(true);
    externalApi()
      .errorType("json")
      .url(`/sets`)
      .get()
      .json(response => {
        setLoading(false);
        deserialize(response).then(data => {
          setSets(data);
        });

        setErrorMessage(null);
      })
      .catch(e => {
        setErrorMessage(e.message);
        setLoading(false);
        setSets(null);
      });
  }, []);

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const handleToggleSearch = () => setSearchOpen(!searchOpen);

  const { search } = useLocation();
  const parsedSearch = queryString.parse(search);

  const ougIdsFromParams = parsedSearch.orgUnitGroups.split(",").filter(i => i);

  const filteredSets = matchSorter(sets, query, {
    keys: ["name", "displayName"],
  }).filter(
    set =>
      !ougIdsFromParams.length ||
      intersectionBy(
        set.orgUnitGroups.map(g => g.id),
        ougIdsFromParams,
      ).length,
  );

  return (
    <Sets
      filteredSets={filteredSets}
      sets={sets}
      loading={loading}
      query={query}
      setQuery={setQuery}
      searchOpen={searchOpen}
      errorMessage={errorMessage}
      handleToggleSearch={handleToggleSearch}
      sideSheetOpen={sideSheetOpen}
      handleToggleSideSheet={handleToggleSideSheet}
    />
  );
};

export default SetsContainer;
