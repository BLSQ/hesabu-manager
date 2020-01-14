import React, { useState, useEffect } from "react";
import matchSorter from "match-sorter";
import SetsGroups from "../../components/SetsGroups";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";

const SetsGroupsContainer = () => {
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [compounds, setSetsGroups] = useState([]);

  useEffect(() => {
    setLoading(true);
    externalApi()
      .errorType("json")
      .url(`/set_groups`)
      .get()
      .json(response => {
        setLoading(false);
        deserialize(response).then(data => {
          setSetsGroups(data);
        });

        setErrorMessage(null);
      })
      .catch(e => {
        setErrorMessage(e.message);
        setLoading(false);
        setSetsGroups(null);
      });
  }, []);

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const handleToggleSearch = () => setSearchOpen(!searchOpen);

  const filteredSetsGroups = matchSorter(compounds, query, {
    keys: ["name", "displayName"],
  });

  return (
    <SetsGroups
      filteredSetsGroups={filteredSetsGroups}
      compounds={compounds}
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

export default SetsGroupsContainer;
