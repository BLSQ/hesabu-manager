import {
  Card,
  CardActions,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  makeStyles,
  withStyles,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Table from "../Table/table";
import SimulationHeader from "./SimulationHeader";
import TotalItems from "./TotalItems";
import { useTranslation } from "react-i18next";

const styles = theme => ({
});

export const Simulation = props => {
  const { classes } = props;
  const { t } = useTranslation();
  const name = props.simulation.code;
  const formatted_date = props.simulation.period;
  const nameWithDate = `${name}-${formatted_date}`;

  // TODO: Fix paddings
  return (
    <Fragment>
      <SimulationHeader key="header" invoice={props.simulation} />
      <Grid container item xs={12} spacing={3}>
        {props.simulation.total_items.map(item => {
          return (<Card>
                    <CardContent>
                      <Typography variant="h4" color="inherit">
                        {item.solution}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography variant="subtitle1" color="inherit">
                        {item.formula}
                      </Typography>
                    </CardActions>
                  </Card>);
        })}
      </Grid>
      <Table key="invoice" invoice={props.simulation} />
    </Fragment>
  );
};

const mapStateToProps = state => ({});

export default withTranslation("translations")(
  withStyles(styles)(
    connect(mapStateToProps)(Simulation)
  )
);
