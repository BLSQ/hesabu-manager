import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import differenceBy from "lodash/differenceBy";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: "5px",
    paddingBottom: "0px",
  },
  chip: {
    fontSize: 12,
    margin: theme.spacing(1 / 10),
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
});

// Will render a multi-select dropdown which after select will render
// (deleteable) pills of the currently selected options.
class MultiSelectDropdown extends React.Component {
  handleChange = event => {
    this.props.optionsChanged(event.target.value);
  };

  handleDelete = deletedKey => () => {
    this.props.optionsChanged(
      this.props.selected
        .filter(item => item.key !== deletedKey)
        .map(item => item.key),
    );
  };

  render() {
    const { classes, name, items, selected } = this.props;
    const itemsWithoutSelected = differenceBy(items, selected, "key");

    return (
      <Fragment>
        <List>
          {selected.map(item => (
            <ListItem key={item.key} className={classes.chips}>
              <Chip
                label={item.human}
                onDelete={this.handleDelete(item.key)}
                className={classes.chip}
              />
            </ListItem>
          ))}
        </List>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel className={classes.label} htmlFor="select-periods">
            {name}
          </InputLabel>
          <Select
            multiple
            disabled={!!!itemsWithoutSelected.length}
            value={selected.map(item => item.key)}
            onChange={this.handleChange}
            labelWidth={100}
            input={<Input id="select-periods" />}
          >
            {itemsWithoutSelected.length &&
              itemsWithoutSelected.map(item => (
                <MenuItem key={item.key} value={item.key}>
                  {item.human}
                </MenuItem>
              ))}
            }
          </Select>
        </FormControl>
      </Fragment>
    );
  }
}

// `name` is the name that will be displayed
// `items` and `selected` expect the same objects
//
// `selected` is a subset of `items` and is used to keep track of
// which items are selected
MultiSelectDropdown.propTypes = {
  name: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      human: PropTypes.string,
    }),
  ),
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      human: PropTypes.string,
    }),
  ),
};

export default withStyles(styles, { withTheme: true })(MultiSelectDropdown);
