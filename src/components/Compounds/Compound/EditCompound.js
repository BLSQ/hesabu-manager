import React, { Fragment } from "react";
import PageContent from "../../Shared/PageContent";
import CompoundForm from "./CompoundForm";

const EditCompound = ({ compound }) => {
  return (
    <Fragment>
      <>
        <PageContent>
          <CompoundForm compound={compound} modeCreate={false} />
        </PageContent>
      </>
    </Fragment>
  );
};

export default EditCompound;
