import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@material-ui/core";
import kebabCase from "lodash/kebabCase";
import classNames from "classnames";
import Header from "../Header";
import useStyles from "./styles";
import PeriodView from "./PeriodView";
import { dhis2LookupCategoryOptionCombo } from "../../../lib/dhis2Lookups";
import { anchorQueryParams, urlWith } from "../../Shared/urlParams";

function a11yProps(index, title) {
  const tag = kebabCase(title);
  return {
    id: `${tag}-tab-${index}`,
    "aria-controls": `${tag}-tabpanel-${index}`,
  };
}

function generateLabel(periodView) {
  return (
    (periodView.coc_ext_id &&
      `${periodView.period} - ${
        dhis2LookupCategoryOptionCombo(periodView.coc_ext_id).name
      }`) ||
    `${periodView.period}`
  );
}

const SimulationBlock = props => {
  const { id, title, periodViews, displaySet, displayPeriod } = props;
  const formattedTitle = title && title.replace("__", "_");
  const tabIndex =
    displaySet && displaySet === title.replace("__", "_") && displayPeriod
      ? periodViews.map(obj => obj.period).indexOf(displayPeriod)
      : 0;
  const [value, setValue] = React.useState(tabIndex);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    const queryParams = anchorQueryParams();
    queryParams.set("displayPeriod", periodViews[newValue].period);
    queryParams.set("displaySet", formattedTitle);
    const newUrl = urlWith(queryParams);
    if (newUrl !== window.location.toString()) {
      window.history.replaceState({}, "", urlWith(queryParams));
    }

    setValue(newValue);
  };
  return (
    <div className={classes.root} id={id} style={{ scrollMarginTop: "500px" }}>
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
              label={generateLabel(periodView)}
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
