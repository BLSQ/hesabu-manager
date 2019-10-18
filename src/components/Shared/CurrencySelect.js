import React from "react";
import Select from "react-select";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  magicStyles,
} from "./Select";

import CurrenciesJson from "../../lib/Currencies";

const currencies = Object.entries(CurrenciesJson).map(c => ({
  value: c[1].symbol,
  label: `${c[1].symbol} - ${c[1].code} - ${c[1].name}`,
  code: c[1].code,
}));

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class CurrencySelect extends React.Component {
  state = {
    value: null,
  };

  componentDidMount() {
    if (this.props.value) {
      const currencyItem = currencies.find(
        c => c.value === this.props.value || c.code === this.props.value,
      ); // if code is not a symbol in the DB, from a previous save
      const currency = currencyItem
        ? {
            value: this.props.value,
            label: currencyItem ? currencyItem.label : this.props.value,
          }
        : null;
      this.setState({
        value: currency,
      });
    }
  }

  handleChange = currency => {
    this.setState({
      value: currency,
    });
    this.props.onChange(currency ? currency.value : null);
  };

  render() {
    const { name, classes, className, t } = this.props;

    return (
      <div className={className}>
        <Select
          classes={classes}
          options={currencies}
          placeholder={t("searchResource", {
            resource: this.props.textFieldProps.label.toLowerCase(),
          })}
          textFieldProps={{
            InputLabelProps: {
              shrink: true,
            },
            name: name,
            ...this.props.textFieldProps,
          }}
          components={components}
          value={this.state.value}
          onChange={this.handleChange}
          isClearable
        />
      </div>
    );
  }
}

export default withTranslation("translations")(
  withStyles(magicStyles)(CurrencySelect),
);
