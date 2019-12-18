import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const Solution = props => {
  const { cell } = props;

  const { t } = useTranslation();

  if (!cell) {
    return t("noData");
  }

  const { value } = cell;

  if (!cell.instantiated_expression) {
    return value;
  }

  return value.not_exported ? <del>{value}</del> : value;
};

export default Solution;
