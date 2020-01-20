import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import SetListItem from "../SetListItem";
import EmptySection from "../../EmptySection";

const SetList = props => {
  const { t } = useTranslation();
  if (!props.loading && props.noItems)
    return <EmptySection resourceName={t("resources.set")} />;
  if (!props.loading && !props.sets.length) return <p>No sets found</p>;
  return (
    <div>
      {props.sets.map((set, index) => (
        <SetListItem key={index} {...set} />
      ))}
    </div>
  );
};

SetList.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object),
  noItems: PropTypes.bool,
  loading: PropTypes.bool,
};

export default SetList;
