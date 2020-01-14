import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import SetsGroup from "../../components/SetsGroups/SetsGroup";

const SetsGroupContainer = props => {
  const { open, compound } = props;

  return <SetsGroup open={open} {...compound} />;
};

SetsGroupContainer.propTypes = {
  open: PropTypes.bool,
  compound: PropTypes.object,
  setsGroupId: PropTypes.string,
};

const mapStateToProps = () => ({
  // #TODO: Fetch over api
  compound: {
    id: "12334",
    name: "Sets group example",
    formulasCount: 3,
    setsGroupsFormulas: [
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

export default connect(mapStateToProps)(withRouter(SetsGroupContainer));
