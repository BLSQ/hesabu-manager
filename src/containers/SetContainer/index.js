import React, { useState, useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import snakeCase from "lodash/snakeCase";
import { activeTab } from "../../lib/setHelpers";
import { externalApi } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";
import Set from "../../components/Sets/Set";
import Dhis2DataElementsProvider from "../Dhis2DataElementsProvider";

const SetContainer = props => {
  const location = useLocation();

  const [sideSheetOpen, setSideSheetOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [set, setSet] = useState({});
  const { setId, open } = props;

  function simulationParams() {
    const prms = new URLSearchParams();
    if (props.simulationPeriod) prms.append("periods", props.simulationPeriod);
    if (set) prms.append("sets", snakeCase(set.name));
    if (!!set?.simulationOrgUnit?.id)
      prms.append("orgUnit", set.simulationOrgUnit.id);
    return prms.toString();
  }

  const reloadData = () => {
    setLoading(true);
    externalApi()
      .errorType("json")
      .url(`/sets/${props.setId}`)
      .get()
      .json(response => {
        setLoading(false);
        deserialize(response, {
          simulationOrgUnit: {
            valueForRelationship(relationship) {
              return {
                id: relationship.id,
                type: relationship.type,
              };
            },
          },
        }).then(data => {
          setSet(data);
        });
      })
      .catch(e => {
        setLoading(false);
        setSet({});
        console.log(e);
      });
  };

  useEffect(() => {
    if (open) {
      reloadData();
    }
  }, [props.setId, open]);

  const currentTab = activeTab(setId, location.pathname);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  return (
    <Dhis2DataElementsProvider>
      <Set
        currentTab={currentTab}
        open={open}
        set={set}
        loading={loading}
        sideSheetOpen={sideSheetOpen}
        handleToggleSideSheet={handleToggleSideSheet}
        simulationParams={simulationParams()}
        location={location}
        onSave={reloadData}
      />
    </Dhis2DataElementsProvider>
  );
};

const mapStateToProps = state => ({
  simulationPeriod: (state.project.periods || [])[0],
});

export default connect(mapStateToProps)(withRouter(SetContainer));
