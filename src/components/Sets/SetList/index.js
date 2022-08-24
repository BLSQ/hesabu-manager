import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
import SetListItem from "../SetListItem";
import EmptySection from "../../EmptySection";
import ActionFab from "../../Shared/ActionFab";

const useStyles = makeStyles(theme => ({
  simulationBtn: {
    right: theme.spacing(4) + 350,
    transition: "all .1s 100ms ease-in-out",
  },
}));

const SetList = props => {
  const { t } = useTranslation();
  const classes = useStyles();

  if (!props.loading && props.noItems)
    return <EmptySection resourceName={t("resources.set")} />;
  if (!props.loading && !props.sets.length) return <p>No sets found</p>;
  return (
    <div>
      {props.sets.map((set, index) => (
        <SetListItem key={index} {...set} />
      ))}
      <ActionFab
        to={{ pathname: `${window.location.href.split("#")[1]}/new` }}
        text="Set"
        className={classes.simulationBtn}
        extended
      />
    </div>
  );
};

SetList.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object),
  noItems: PropTypes.bool,
  loading: PropTypes.bool,
};

export default SetList;
