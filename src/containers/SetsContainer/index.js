import React, { useState } from "react";
import { useQuery } from "react-query";
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
  const [errorMessage, setErrorMessage] = useState(null);

  const loadSetsQuery = useQuery(
    "loadSets",
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/sets`)
        .get()
        .json();
      response = deserialize(response);
      return response;
    },
    {
      onSuccess: () => {
        setErrorMessage(null);
      },
      onError: error => {
        setErrorMessage(error.message);
      },
    },
  );

  const sets = loadSetsQuery?.data;
  const loading = loadSetsQuery?.isLoading;

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const handleToggleSearch = () => setSearchOpen(!searchOpen);

  const { search } = useLocation();
  const parsedSearch = queryString.parse(search);

  const ougIdsFromParams = (parsedSearch.orgUnitGroups || "")
    .split(",")
    .filter(i => i);

  let filteredSets;
  if (sets) {
    filteredSets = matchSorter(sets, query, {
      keys: ["name", "displayName"],
    }).filter(
      set =>
        !ougIdsFromParams.length ||
        intersectionBy(
          set.orgUnitGroups.map(g => g.id),
          ougIdsFromParams,
        ).length,
    );
  }

  return (
    <>
      {sets && (
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
      )}
    </>
  );
};

export default SetsContainer;
