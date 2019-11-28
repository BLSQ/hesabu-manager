import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import SetsGroupsListItem from "../SetsGroupsListItem";
import EmptySection from "../../EmptySection";

const SetsGroupsList = props => {
  const { t } = useTranslation();
  if (props.noItems)
    return <EmptySection resourceName={t("resources.setsGroup")} />;
  if (!props.setsGroups.length) return <p>No sets groups found</p>;
  return (
    <div>
      {props.setsGroups.map((set, index) => (
        <SetsGroupsListItem key={index} {...set} />
      ))}
    </div>
  );
};

SetsGroupsList.propTypes = {
  setsGroups: PropTypes.arrayOf(PropTypes.object),
  noItems: PropTypes.bool,
};

export default SetsGroupsList;
