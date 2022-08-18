import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent.js";
import SetForm from "./SetForm";

const NewSet = () => {
  const set = {
    name: "",
    description: "",
    frequency: "",
    kind: "",
    orgUnitGroups: [],
    orgUnitGroupSets: [],
    groupSetsExtRefs: [],
    loopOverComboExtId: "",
    inputs: [],
    topics: [],
    includeMainOrgunit: false,
    mainEntityGroups: [],
    targetEntityGroups: [],
    ogsReference: "",
  };

  const backLinkPath = `/sets`;

  return (
    <Fragment>
      <>
        <TopBar backLinkPath={backLinkPath}>
          <Typography variant="h6" color="inherit">
            New set
          </Typography>
        </TopBar>
        <PageContent>
          <SetForm set={set} modeCreate={true} />
        </PageContent>
      </>
    </Fragment>
  );
};

export default NewSet;
