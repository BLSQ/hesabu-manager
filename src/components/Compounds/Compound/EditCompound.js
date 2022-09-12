import React from "react";
import PageContent from "../../Shared/PageContent";
import CompoundForm from "./CompoundForm";

const EditCompound = ({ compound }) => {
  return (
    <PageContent>
      <CompoundForm compound={compound} modeCreate={false} />
    </PageContent>
  );
};

export default EditCompound;
