import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";
import { Dhis2Icon } from "@blsq/manager-ui";

import Api from "../../../../lib/Api";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const ViewOnDhis2Btn = props => {
  const { cell } = props;
  const classes = useStyles(props);
  const [identifiableObject, setIdentifiableObject] = useState(undefined);

  const isInput = !!cell.state;
  const isOutput = !!cell.dhis2_data_element;

  useEffect(() => {
    const fetchData = async () => {
      const api = await Api.instance();
      try {
        setIdentifiableObject(undefined);
        let dhis2Object = undefined;
        if (isInput) {
          const ids = cell.state.ext_id.replace("inlined-", "").split(".");
          const dataElementId = ids[0]; // data element or indicator id
          const cocId = ids[1]; // optional combo
          dhis2Object = await api.get(`identifiableObjects/${dataElementId}`);
          if (cocId) {
            dhis2Object.categoryOptionCombo = await api.get(
              `categoryOptionCombos/${cocId}`,
              { fields: "id,name" },
            );
          }
        }

        if (isOutput) {
          dhis2Object = await api.get(
            `identifiableObjects/${cell.dhis2_data_element}`,
          );
        }
        let dhis2UiUrl = undefined;

        if (dhis2Object && dhis2Object.href.includes("/dataElements/")) {
          dhis2UiUrl = `/dhis-web-maintenance/index.html#/edit/dataElementSection/dataElement/${dhis2Object.id}`;
        }

        if (dhis2Object && dhis2Object.href.includes("/indicators/")) {
          dhis2UiUrl = `/dhis-web-maintenance/index.html#/edit/indicatorSection/indicator/${dhis2Object.id}`;
        }

        if (dhis2UiUrl) {
          dhis2Object.dhis2UiUrl = api.baseUrl + "/.." + dhis2UiUrl;
        }

        setIdentifiableObject(dhis2Object);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cell, isInput, isOutput]);

  if (!isInput && !isOutput) {
    return null;
  }

  return (
    <>
      <Button
        tag="a"
        href={identifiableObject && identifiableObject.dhis2UiUrl}
        color="primary"
        target="_blank"
        className={classes.root}
      >
        <Dhis2Icon className={classes.icon} />
        {identifiableObject && identifiableObject.name}
        {identifiableObject &&
          identifiableObject.categoryOptionCombo &&
          " : " + identifiableObject.categoryOptionCombo.name}
      </Button>
    </>
  );
};

ViewOnDhis2Btn.propTypes = {
  cell: PropTypes.object,
};

export default ViewOnDhis2Btn;
