import React, { useState } from "react";
import { useQuery } from "react-query";
import { externalApi } from "../actions/api";
import { deserialize } from "../utils/jsonApiUtils";
import ChangesList from "../components/Changes/ChangesList";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { Typography } from "@material-ui/core";

const ChangesContainer = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const loadChangesQuery = useQuery(
    "loadChanges",
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/changes`)
        .get()
        .json();
      response = await deserialize(response);
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

  const changes = loadChangesQuery?.data;
  const loading = loadChangesQuery?.isLoading;
  //TODO initialize this with react query
  const usersById = {};
  return (
    <>
      {changes && (
        <>
          <TopBar>
            <Typography variant="h6" color="inherit">
              Changes
            </Typography>
          </TopBar>
          <PageContent>
            <ChangesList changes={changes} usersById={usersById} />
          </PageContent>
        </>
      )}
    </>
  );
};

export default ChangesContainer;
