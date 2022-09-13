import React, { Fragment } from "react";
import { useQuery } from "react-query";
import { Typography } from "@material-ui/core";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent.js";
import CompoundForm from "./CompoundForm";
import { externalApi } from "../../../actions/api";
import { deserialize } from "../../../utils/jsonApiUtils";

const NewCompound = () => {
  const backLinkPath = `/compounds`;

  const fetchNewCompoundQuery = useQuery(
    "fetchNewCompound",
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/compounds/new`)
        .get()
        .json();
      response = await deserialize(response);
      return response;
    },
    {
      onError: error => console.log(error.message),
    },
  );

  const compound = fetchNewCompoundQuery?.data;
  return (
    <Fragment>
      <>
        <TopBar backLinkPath={backLinkPath}>
          <Typography variant="h6" color="inherit">
            New compound
          </Typography>
        </TopBar>
        <PageContent>
          {compound && <CompoundForm compound={compound} modeCreate={true} />}
        </PageContent>
      </>
    </Fragment>
  );
};

export default NewCompound;
