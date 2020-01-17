import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@material-ui/core";
import kebabCase from "lodash/kebabCase";
import classNames from "classnames";
import Header from "../Header";
import useStyles from "./styles";
import PeriodView from "./PeriodView";

function a11yProps(index, title) {
  const tag = kebabCase(title);
  return {
    id: `${tag}-tab-${index}`,
    "aria-controls": `${tag}-tabpanel-${index}`,
  };
}

const SimulationBlock = props => {
  const { title, periodViews } = props;
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Header title={title} />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
      >
        {periodViews.map((periodView, index) => {
          return (
            <Tab
              key={`${kebabCase(title)}-tab-${index}`}
              label={periodView.period}
              {...a11yProps(index, title)}
            />
          );
        })}
      </Tabs>
      {periodViews.map((periodView, index) => {
        return (
          <PeriodView
            key={[
              periodView.orgunit_ext_id,
              periodView.period,
              periodView.code,
            ].join("-")}
            periodView={periodView}
            className={classNames({ [classes.hidden]: index !== value })}
          />
        );
      })}
    </div>
  );
};

SimulationBlock.propTypes = {
  periodViews: PropTypes.array,
  title: PropTypes.string,
};

export default SimulationBlock;
