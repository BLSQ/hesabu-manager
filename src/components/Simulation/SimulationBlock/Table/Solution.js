import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Solution = props => {
  const { cell } = props;

  const { t } = useTranslation();

  if (!cell) {
    return t("noData");
  }

  const { value } = cell;

  // Basically the topic name
  if (!cell.instantiatedExpression) {
    return value;
  }

  return cell.notExported ? <del>{value}</del> : value;
};

Solution.propTypes = {
  cell: PropTypes.object,
};

export default Solution;
