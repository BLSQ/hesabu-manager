import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@material-ui/core";
import kebabCase from "lodash/kebabCase";
import classNames from "classnames";
import Header from "../Header";
import PeriodView from "../PeriodView";
import useStyles from "./styles";

function a11yProps(index, title) {
  const tag = kebabCase(title);
  return {
    id: `${tag}-tab-${index}`,
    "aria-controls": `${tag}-tabpanel-${index}`,
  };
}

const SimulationBlock = props => {
  const { title, simulations } = props;
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header title={title} />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
      >
        {simulations.map((simulation, index) => {
          return (
            <Tab
              key={`${kebabCase(title)}-tab-${index}`}
              label={simulation.period}
              {...a11yProps(index, title)}
            />
          );
        })}
      </Tabs>
      {simulations.map((simulation, index) => {
        return (
          <PeriodView
            key={[
              simulation.orgunit_ext_id,
              simulation.period,
              simulation.code,
            ].join("-")}
            simulation={simulation}
            className={classNames({ [classes.hidden]: index !== value })}
          />
        );
      })}
    </div>
  );
};

SimulationBlock.propTypes = {
  simulations: PropTypes.array,
  title: PropTypes.string,
};

export default SimulationBlock;
