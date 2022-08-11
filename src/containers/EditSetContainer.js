import React, { Fragment, useState } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { externalApi } from "../actions/api";
import { deserialize } from "../utils/jsonApiUtils";
import SetForm from "../components/Sets/Set/SetForm";

const EditSetContainer = ({ set }) => {
  return (
    <Fragment>
      <>
        <PageContent>
          <SetForm set={set} modeCreate={false} />
        </PageContent>
      </>
    </Fragment>
  );
};

export default EditSetContainer;
