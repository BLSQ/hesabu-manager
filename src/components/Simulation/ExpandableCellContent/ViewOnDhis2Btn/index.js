import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles } from "@material-ui/core";
import { Dhis2Icon } from "@blsq/manager-ui";

import { fetchIdentifiableObject } from "./utils";

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

  const isInput = !!cell.state && !!cell.state.ext_id;
  const isOutput = !!cell.dhis2_data_element;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIdentifiableObject(undefined);
        const dhis2Object = await fetchIdentifiableObject(
          cell,
          isInput,
          isOutput,
        );
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
