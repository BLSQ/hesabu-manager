import React, { useState, useEffect } from "react";
import matchSorter from "match-sorter";
import { externalApi } from "../../actions/api";
import Sets from "../../components/Sets";
import { deserialize } from "../../utils/jsonApiUtils";

const SetsContainer = () => {
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
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

  const filteredSets = matchSorter(sets, query, {
    keys: ["name", "displayName"],
  });

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
