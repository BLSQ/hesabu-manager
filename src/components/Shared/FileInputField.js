import { InputLabel, withStyles } from "@material-ui/core";
import React, { Component, Fragment } from "react";

const styles = theme => ({
  input: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  label: {
    width: "100%",
  },
});

class FileInputField extends Component {
  handleChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result;

      if (base64.length) {
        this.props.onChange(base64);
      }
    };
  };

  render() {
    const { label, value, required, ...rest } = this.props;
    return (
      <Fragment>
        <InputLabel
          htmlFor={`${this.props.name}-file`}
          shrink
          required={required || undefined}
          className={this.props.classes.label}
        >
          {this.props.label}
        </InputLabel>
        <input
          {...rest}
          accept={this.props.accept || undefined}
          id={`${this.props.name}-file`}
          multiple
          type="file"
          onChange={e => this.handleChange(e)}
          className={this.props.classes.input}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(FileInputField);
