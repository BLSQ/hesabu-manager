import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Compound from "../../components/Compounds/Compound";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";
import Dhis2DataElementsProvider from "../Dhis2DataElementsProvider";

const CompoundContainer = props => {
  const { open } = props;
  const [sideSheetOpen, setSideSheetOpen] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [compound, setCompound] = useState({});

  useEffect(() => {
    if (open) {
      setLoading(true);
      externalApi()
        .errorType("json")
        .url(`/compounds/${props.compoundId}`)
        .get()
        .json(response => {
          setLoading(false);
          deserialize(response).then(data => {
            setCompound(data);
          });

          setErrorMessage(null);
        })
        .catch(e => {
          setErrorMessage(e.message);
          setLoading(false);
          setCompound({});
        });
    }
  }, [props.compoundId, open]);

  return (
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
  );
};

CompoundContainer.propTypes = {
  open: PropTypes.bool,
  compoundId: PropTypes.string,
};

export default withRouter(CompoundContainer);
