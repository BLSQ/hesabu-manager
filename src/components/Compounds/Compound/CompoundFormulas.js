import React from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Formulas from "../../Formula/Formulas";
import ActionFab from "../../Shared/ActionFab";
import { canEdit } from "../../../actions/api";
import { APPBAR_WITH_TABS_HEIGHT } from "../../../constants/ui";
import SideSheet from "../../SideSheet";
import SidebarBlock from "../../Shared/SidebarBlock";
import { formattedName } from "../../../utils/textUtils";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: APPBAR_WITH_TABS_HEIGHT,
    padding: theme.spacing(2),
  },
  simulationBtn: {
    right: theme.spacing(4) + 450,
    transition: "all .1s 100ms ease-in-out",
  },
  formulasHolder: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const CompoundFormulas = ({
  formulas,
  compound,
  sideSheetOpen,
  onSideSheetClose,
}) => {
  const userCanEdit = canEdit();
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div className={classes.formulasHolder}>
            <Formulas formulas={formulas} parent={compound} />

            <ActionFab
              disabled={!userCanEdit}
              to={{ pathname: `${window.location.href.split("#")[1]}/new` }}
              text="Formula"
              extended
              className={classes.simulationBtn}
            />
          </div>
        </Grid>

        <Grid xs={4}>
          <div>
            <SideSheet
              variant="big"
              title={t("compound.sidesheet.title")}
              open={sideSheetOpen}
              onClose={onSideSheetClose}
            >
              {compound.frequency && (
                <SidebarBlock title={formattedName(t(`compound.frequency`))}>
                  {t(`periodicity.${compound.frequency}`)}
                </SidebarBlock>
              )}
              {compound.sets && (
                <SidebarBlock title={formattedName(t(`compound.sets`))}>
                  {compound.sets
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(set => (
                      <div key={`set-${set.id}`}>
                        <Typography
                          component={Link}
                          to={`/sets/${set.id}`}
                          color="inherit"
                          title={set.frequency}
                        >
                          {set.name}
                        </Typography>
                      </div>
                    ))}
                </SidebarBlock>
              )}
            </SideSheet>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompoundFormulas;
