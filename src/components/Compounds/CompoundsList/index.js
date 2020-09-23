import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CompoundsListItem from "../CompoundsListItem";
import EmptySection from "../../EmptySection";

const CompoundsList = props => {
  const { t } = useTranslation();
  if (!props.loading && props.noItems)
    return <EmptySection resourceName={t("resources.compound")} />;
  if (!props.loading && !props.compounds.length)
    return <p>No compounds found</p>;
  return (
    <div>
      {props.compounds.map((set, index) => (
        <CompoundsListItem key={index} {...set} />
      ))}
    </div>
  );
};

CompoundsList.propTypes = {
  compounds: PropTypes.arrayOf(PropTypes.object),
  noItems: PropTypes.bool,
  loading: PropTypes.bool,
};

export default CompoundsList;
