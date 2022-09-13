import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import Compound from "../../components/Compounds/Compound";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";
import Dhis2DataElementsProvider from "../Dhis2DataElementsProvider";

const CompoundContainer = props => {
  const { open } = props;
  const [sideSheetOpen, setSideSheetOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchCompoundQuery = useQuery(
    ["fetchCompound", props.compoundId],
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/compounds/${props.compoundId}`)
        .get()
        .json();
      response = deserialize(response);
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

  const compound = fetchCompoundQuery?.data;
  const loading = fetchCompoundQuery?.isLoading;

  return (
    <>
      {compound && (
        <Dhis2DataElementsProvider>
          <Compound
            open={open}
            loading={loading}
            errorMessage={errorMessage}
            compound={compound}
            {...compound}
            sideSheetOpen={sideSheetOpen}
            onSideSheetClose={() => setSideSheetOpen(false)}
            onToggleSideSheet={() => setSideSheetOpen(!sideSheetOpen)}
          />
        </Dhis2DataElementsProvider>
      )}
    </>
  );
};

CompoundContainer.propTypes = {
  open: PropTypes.bool,
  compoundId: PropTypes.string,
};

export default withRouter(CompoundContainer);
