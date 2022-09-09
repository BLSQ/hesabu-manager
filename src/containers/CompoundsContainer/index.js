import React, { useState } from "react";
import { useQuery } from "react-query";
import matchSorter from "match-sorter";
import Compounds from "../../components/Compounds";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";

const CompoundsContainer = () => {
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchCompoundsQuery = useQuery(
    "fetchCompounds",
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/compounds`)
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

  const compounds = fetchCompoundsQuery?.data;
  const loading = fetchCompoundsQuery?.isLoading;

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const handleToggleSearch = () => setSearchOpen(!searchOpen);

  const filteredCompounds = matchSorter(compounds, query, {
    keys: ["name", "displayName"],
  });

  return (
    <>
      {compounds && (
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
      )}
    </>
  );
};

export default CompoundsContainer;
