import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import snakeCase from "lodash/snakeCase";

import { externalApi } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";
import Set from "../../components/Sets/Set";
import Dhis2DataElementsProvider from "../Dhis2DataElementsProvider";

const SetContainer = props => {
  const location = useLocation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const { setId, open } = props;

  function simulationParams() {
    const prms = new URLSearchParams();
    if (props.simulationPeriod) prms.append("periods", props.simulationPeriod);
    if (set) prms.append("sets", snakeCase(set.name));
    if (!!set?.simulationOrgUnit?.id)
      prms.append("orgUnit", set.simulationOrgUnit.id);
    return prms.toString();
  }

  const loadSetQuery = useQuery(
    ["loadSet", setId],
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/sets/${setId}`)
        .get()
        .json();
      response = await deserialize(response, {
        simulationOrgUnit: {
          valueForRelationship(relationship) {
            return {
              id: relationship.id,
              type: relationship.type,
            };
          },
        },
      });
      return response;
    },
    {
      onError: error => {
        console.log(error);
      },
    },
  );

  const set = loadSetQuery?.data;
  const loading = loadSetQuery?.isLoading;

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  return (
    <>
      {set && (
        <Dhis2DataElementsProvider>
          <Set
            open={open}
            set={set}
            loading={loading}
            sideSheetOpen={sideSheetOpen}
            handleToggleSideSheet={handleToggleSideSheet}
            simulationParams={simulationParams()}
            location={location}
          />
        </Dhis2DataElementsProvider>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  simulationPeriod: (state.project.periods || [])[0],
});

export default connect(mapStateToProps)(withRouter(SetContainer));
