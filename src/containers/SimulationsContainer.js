import {
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
import PageContent from "../components/Shared/PageContent";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import TopBar from "../components/Shared/TopBar";
import InfoBox from "../components/Shared/InfoBox";

import { useTranslation } from "react-i18next";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 999,
  },
  drawer: {
    width: '200px',
    flexShrink: 0,
  },
  drawerPaper: {
    zIndex: 100,
    width: '200px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});


const SimulationsContainer = props => {
  const { classes } = props;
  const { t } = useTranslation();

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

  };

  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {t("drawerItems.sets")}
        </Typography>
      </TopBar>
      <PageContent>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12} lg={8}>
            <InfoBox>
SIMULATIONS
            </InfoBox>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="right"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.toolbar} />
              <p>O HAI</p>
            </Drawer>
          </Grid>
        </Grid>
      </PageContent>
    </Fragment>
  );
};


const mapStateToProps = state => ({});

export default withTranslation("translations")(
  withStyles(styles)(
    connect(mapStateToProps)(SimulationsContainer)
  )
);
