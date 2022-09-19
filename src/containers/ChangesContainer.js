import React, { useState } from "react";
import { useQuery } from "react-query";
import { externalApi } from "../actions/api";
import { deserialize } from "../utils/jsonApiUtils";
import ChangesList from "../components/Changes/ChangesList";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { Switch, Typography } from "@material-ui/core";
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

  const [showUsers, setShowUsers] = React.useState(false);
  return (
    <>
      {changes && usersById && (
        <>
          <TopBar>
            <Typography variant="h6" color="inherit">
              Changes
            </Typography>
            <Switch
              color="primary"
              name="show users related changes"
              title="show users related changes"
              checked={showUsers}
              onChange={() => setShowUsers(!showUsers)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </TopBar>
          <PageContent>
            <ChangesList
              changes={changes.filter(change =>
                showUsers ? true : change.itemType !== "User",
              )}
              usersById={usersById}
            />
          </PageContent>
        </>
      )}
    </>
  );
};

export default ChangesContainer;
