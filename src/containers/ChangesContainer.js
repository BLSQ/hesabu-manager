import React, { useState } from "react";
import { useQuery } from "react-query";
import { externalApi } from "../actions/api";
import { deserialize } from "../utils/jsonApiUtils";
import ChangesList from "../components/Changes/ChangesList";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { Typography } from "@material-ui/core";
import Api from "../lib/Api";
import _ from "lodash";

const ChangesContainer = () => {
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
      onError: error => console.log(error.message),
    },
  );

  const changes = loadChangesQuery?.data;

  const loadUsersQuery = useQuery(
    "loadUsers",
    async () => {
      const api = await Api.instance();
      const usersResponse = await api.get("users", {
        fields: "id,displayName,username",
        paging: false,
      });
      return _.keyBy(usersResponse.users, u => u.id);
    },
    {
      onError: error => console.log(error.message),
    },
  );

  const usersById = loadUsersQuery?.data;
  return (
    <>
      {changes && usersById && (
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
