import Api from "../../lib/Api";
import AsyncSelect from "react-select/async";
import React from "react";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";

import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
  magicStyles,
} from "./Select";

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
  Menu,
};

class MagicSelect extends React.Component {
  state = {
    currentValue: null,
    suggestions: [],
  };

  static defaultProps = {
    isMulti: false,
  };

  resetState() {
    this.setState(
      {
        currentValue: null,
      },
      () => this.props.onChange(isArray(this.props.fieldValue) ? [] : ""),
    );
  }

  handleChange = value => {
    if (this.props.isMulti ? value.length : value) {
      this.setState(
        {
          currentValue: value,
        },
        () =>
          this.props.onChange(
            this.props.isMulti
              ? isArray(this.props.fieldValue)
                ? value.map(val => val.value)
                : value.map(val => val.value).join(",")
              : value.value,
          ),
      );
    } else {
      this.resetState();
    }
  };

  componentDidMount() {
    const { fieldValue } = this.props;
    if (!fieldValue) {
      return false;
    }
    let values;
    switch (typeof fieldValue) {
      case "object":
        values = fieldValue.filter(n => n);
        break;
      case "string":
        values = fieldValue.split(",").filter(n => n);
        break;
      default:
        values = [fieldValue];
        break;
    }
    if (typeof fieldValue !== "number" && isEmpty(fieldValue)) return false;

    this.setState({ placeholder: "Fetching value" });
    const promises = values.map(value => this.fetchResourcesName(value));
    Promise.all(promises).then(resources => {
      const currentValue = resources.map(resource => ({
        label: !!resource ? resource.name : "Could not retrieve name",
        value: !!resource ? resource.id : "Could not retrieve value",
      }));
      this.setState({ currentValue, placeholder: undefined });
    });
  }

  fetchResourcesName(id) {
    return Api.resourcesName(
      this.props.resourceType,
      id,
      this.props.valueAttribute,
    );
  }

  fetchSuggestions = inputValue => {
    if (inputValue.length < 3) return false;
    return Api.suggestionsFor(
      this.props.autocompleteResourceType,
      inputValue,
    ).then(data => {
      return data.toArray().map(suggestion => ({
        label: suggestion.name,
        value: this.props.valueAttribute
          ? suggestion[this.props.valueAttribute]
          : suggestion.id,
      }));
    });
  };

  render() {
    const { classes, t } = this.props;

    return (
      <AsyncSelect
        classes={classes}
        components={components}
        value={this.state.currentValue}
        onChange={this.handleChange}
        loadOptions={this.fetchSuggestions}
        isClearable
        menuPlacement={"auto"}
        isMulti={!!this.props.isMulti}
        placeholder={
          this.state.placeholder ||
          t("searchResource", {
            resource: t(`dhis2Resources.${this.props.resourceType}`),
          })
        }
        noOptionsMessage={() =>
          t("typeIncentive", {
            resource: t(`dhis2Resources.${this.props.resourceType}`),
          })
        }
        textFieldProps={{
          InputLabelProps: {
            shrink: true,
          },
          ...this.props.textFieldProps,
        }}
      />
    );
  }
}

export default withTranslation("translations")(
  withStyles(magicStyles, { withTheme: true })(MagicSelect),
);
