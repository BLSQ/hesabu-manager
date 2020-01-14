import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Compound from "../../components/Compounds/Compound";

const CompoundContainer = props => {
  const { open, compound } = props;

  return <Compound open={open} {...compound} />;
};

CompoundContainer.propTypes = {
  open: PropTypes.bool,
  compound: PropTypes.object,
  compoundId: PropTypes.string,
};

const mapStateToProps = () => ({
  // #TODO: Fetch over api
  compound: {
    id: "12334",
    name: "Sets group example",
    formulasCount: 3,
    compoundsFormulas: [
      {
        name: "Set group formula example",
        id: " 2234",
      },
      {
        name: "Set group formula example",
        id: " 2234",
      },
    ],
  },
});

export default connect(mapStateToProps)(withRouter(CompoundContainer));
