import React, { useState, useEffect } from "react";
import matchSorter from "match-sorter";
import Compounds from "../../components/Compounds";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";

const CompoundsContainer = () => {
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [compounds, setCompounds] = useState([]);

  useEffect(() => {
    setLoading(true);
    externalApi()
      .errorType("json")
      .url(`/compounds`)
      .get()
      .json(response => {
        setLoading(false);
        deserialize(response).then(data => {
          setCompounds(data);
        });

        setErrorMessage(null);
      })
      .catch(e => {
        setErrorMessage(e.message);
        setLoading(false);
        setCompounds([]);
      });
  }, []);

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const handleToggleSearch = () => setSearchOpen(!searchOpen);

  const filteredCompounds = matchSorter(compounds, query, {
    keys: ["name", "displayName"],
  });

  return (
    <Compounds
      filteredCompounds={filteredCompounds}
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

export default CompoundsContainer;
