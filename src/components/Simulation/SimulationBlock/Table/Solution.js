import React from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-ui/core";

const Solution = props => {
  const { cell } = props;

  const { t } = useTranslation();

  if (!cell) {
    return t("noData");
  }

  const { value } = cell;

  // Basically the topic name
  if (!cell.instantiated_expression) {
    return value;
  }

  return cell.not_exported ? <del>{value}</del> : value;
};

export default Solution;
