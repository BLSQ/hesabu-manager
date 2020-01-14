import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import SetsGroupsListItem from "../SetsGroupsListItem";
import EmptySection from "../../EmptySection";

const SetsGroupsList = props => {
  const { t } = useTranslation();
  if (props.noItems)
    return <EmptySection resourceName={t("resources.compound")} />;
  if (!props.compounds.length) return <p>No compounds found</p>;
  return (
    <div>
      {props.compounds.map((set, index) => (
        <SetsGroupsListItem key={index} {...set} />
      ))}
    </div>
  );
};

SetsGroupsList.propTypes = {
  compounds: PropTypes.arrayOf(PropTypes.object),
  noItems: PropTypes.bool,
};

export default SetsGroupsList;
