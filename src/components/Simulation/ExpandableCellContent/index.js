import React, { Fragment } from "react";
import PropTypes from "prop-types";
import humanize from "string-humanize";
import { Tab, Tabs, Typography } from "@material-ui/core";
import kebabCase from "lodash/kebabCase";
import { useTranslation } from "react-i18next";
import AceEditor from "react-ace";
import useStyles from "./styles";
import ViewOnDhis2Btn from "./ViewOnDhis2Btn";

import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";

function a11yProps(index, title) {
  const tag = kebabCase(title);
  return {
    id: `${tag}-tab-${index}`,
    "aria-controls": `${tag}-tabpanel-${index}`,
  };
}

function ExpandableCellTabs(props) {
  const { value } = props;
  const { t } = useTranslation();
  const classes = useStyles(props);

  return (
    <Tabs
      value={value}
      onChange={props.onChange}
      className={classes.tabs}
      aria-label={t("cellExplanation.tabs.title")}
    >
      <Tab
        label={t("cellExplanation.tabs.code")}
        {...a11yProps(0, t("cellExplanation.tabs.code"))}
      />
      <Tab
        label={t("cellExplanation.tabs.values")}
        {...a11yProps(1, t("cellExplanation.tabs.code"))}
      />
      <Tab
        label={t("cellExplanation.tabs.debug")}
        {...a11yProps(2, t("cellExplanation.tabs.code"))}
      />
    </Tabs>
  );
}

const Editor = props => (
  <AceEditor
    mode="ruby"
    theme="monokai"
    fontSize={16}
    value={props.value}
    readOnly
    wrapEnabled
    minLines={10}
    width="100%"
    height="200px"
  />
);

const ExpandableCellContent = props => {
  const { cell } = props;
  const [value, setValue] = React.useState(0);
  const classes = useStyles(props);
  const { t } = useTranslation();

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  if (!cell) {
    return t("cellExplanation.noSelectedCell");
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {humanize(cell.key || cell.formula)}
      </Typography>
      <ViewOnDhis2Btn cell={cell} />
      {cell.expression && (
        <Fragment>
          <ExpandableCellTabs onChange={handleChange} value={value} />
          {value === 0 && <Editor value={cell.expression} />}
          {value === 1 && <Editor value={cell.substituted} />}
          {value === 2 && <Editor value={cell.instantiatedExpression} />}
        </Fragment>
      )}
    </div>
  );
};

ExpandableCellContent.propTypes = {
  cell: PropTypes.object,
};

export default ExpandableCellContent;
