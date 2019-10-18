import React, { Component } from "react";

import { DatePicker } from "material-ui-pickers";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
});

class DateField extends Component {
  handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <DatePicker
        variant="outlined"
        className={this.props.classes.root}
        {...this.props}
        onChange={this.handleChange}
        onClose={this.handleBlur}
        animateYearScrolling={false}
        leftArrowIcon={<KeyboardArrowLeft />}
        rightArrowIcon={<KeyboardArrowRight />}
      />
    );
  }
}

export default withStyles(styles)(DateField);
