import React, { Component } from "react";

import RichTextEditor from "react-rte";
import { toolbarConfig } from "../../lib/rteToolbarConfigs";
import { withStyles } from "@material-ui/core";
import isEmpty from "lodash/isEmpty";
const styles = theme => ({
  editor: {
    marginBottom: theme.spacing(4),
    fontFamily: "Roboto !important",
    lineHeight: 1.5,
  },
});

class RteField extends Component {
  state = {
    value: !isEmpty(this.props.content)
      ? RichTextEditor.createValueFromString(this.props.content, "html")
      : RichTextEditor.createValueFromString("", "html"),
  };

  static defaultProps = {
    toolbarConfig: toolbarConfig,
  };

  handleChange = value => {
    this.setState({ value });
    this.props.onChange(value.toString("html"));
  };

  render() {
    const { classes } = this.props;
    return (
      <RichTextEditor
        className={classes.editor}
        value={this.state.value}
        onChange={this.handleChange}
        toolbarConfig={this.props.toolbarConfig}
      />
    );
  }
}

export default withStyles(styles)(RteField);
