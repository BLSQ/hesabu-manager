import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Compound from "../../components/Compounds/Compound";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";

const CompoundContainer = props => {
  const { open } = props;

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [compound, setCompound] = useState({});

  useEffect(() => {
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
  }, []);

  return <Compound open={open} {...compound} />;
};

CompoundContainer.propTypes = {
  open: PropTypes.bool,
  compoundId: PropTypes.string,
};

export default withRouter(CompoundContainer);
