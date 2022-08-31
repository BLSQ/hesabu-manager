import React, { Fragment } from "react";
import { useQuery } from "react-query";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { Typography } from "@material-ui/core";
import { externalApi } from "../actions/api";
import { deserialize } from "../utils/jsonApiUtils";
import UserList from "../components/Users/UserList";

const UsersContainer = () => {
  const fetchUsersQuery = useQuery(
    "fetchUsers",
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/users`)
        .get()
        .json();

      response = await deserialize(response);
      return response;
    },
    {
      onError: error => {
        console.log(error.message);
      },
    },
  );

  const users = fetchUsersQuery?.data;
  return (
    <Fragment>
      {users && (
        <>
          <TopBar>
            <Typography variant="h6" color="inherit">
              Users
            </Typography>
          </TopBar>
          <PageContent>
            <UserList users={users}></UserList>
          </PageContent>
        </>
      )}
    </Fragment>
  );
};

export default UsersContainer;
