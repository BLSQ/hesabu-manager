import { InputLabel, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";

const styles = theme => ({
  input: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  label: {
    width: "100%",
  },
});

const FileInputField = props => {
  const handleChange = e => {
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

  const { label, value, required, ...rest } = props;

  return (
    <Fragment>
      <InputLabel
        htmlFor={`${props.name}-file`}
        shrink
        required={required || undefined}
        className={props.classes.label}
      >
        {props.label}
      </InputLabel>
      <input
        {...rest}
        accept={props.accept || undefined}
        id={`${props.name}-file`}
        multiple
        type="file"
        onChange={e => handleChange(e)}
        className={props.classes.input}
      />
    </Fragment>
  );
};

export default withStyles(styles)(FileInputField);
