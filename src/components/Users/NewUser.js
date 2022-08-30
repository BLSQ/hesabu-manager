import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TopBar from "../Shared/TopBar";
import PageContent from "../Shared/PageContent.js";
import UserForm from "./UserForm";

const NewUser = () => {
  const history = useHistory();
  const user = {
    email: "",
    dhis2UserRef: "",
  };
  const backLinkPath = `/users`;

  const afterMutate = () => {
    const path = "/users";
    history.push(path);
  };

  return (
    <Fragment>
      <>
        <TopBar backLinkPath={backLinkPath}>
          <Typography variant="h6" color="inherit">
            New user
          </Typography>
        </TopBar>
        <PageContent>
          <UserForm user={user} modeCreate={true} afterMutate={afterMutate} />
        </PageContent>
      </>
    </Fragment>
  );
};

export default NewUser;
