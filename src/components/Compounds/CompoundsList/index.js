import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CompoundsListItem from "../CompoundsListItem";
import EmptySection from "../../EmptySection";
import ActionFab from "../../Shared/ActionFab";
import { canEdit } from "../../../actions/api";

const useStyles = makeStyles(theme => ({
  simulationBtn: {
    right: theme.spacing(4) + 350,
    transition: "all .1s 100ms ease-in-out",
  },
}));

const CompoundsList = props => {
  const classes = useStyles();
  const userCanEdit = canEdit();
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
      <ActionFab
        disabled={!userCanEdit}
        to={{ pathname: `${window.location.href.split("#")[1]}/new` }}
        text="Compound"
        className={classes.simulationBtn}
        extended
      />
    </div>
  );
};

CompoundsList.propTypes = {
  compounds: PropTypes.arrayOf(PropTypes.object),
  noItems: PropTypes.bool,
  loading: PropTypes.bool,
};

export default CompoundsList;
