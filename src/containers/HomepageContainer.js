import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  withStyles,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { Field, Formik, getIn } from "formik";
import React, { Component, Fragment } from "react";
import { projectToolbarConfig } from "../lib/rteToolbarConfigs";
import RteField from "../components/Shared/RteField";
import ApiErrorsFormatter from "../lib/ApiErrorsFormatter";
import FileInputField from "../components/Shared/FileInputField";
import FormActions from "../components/Shared/FormActions";
import FormSectionHeader from "../components/Shared/FormSectionHeader";
import PageContent from "../components/Shared/PageContent";
import { connect } from "react-redux";
import { errorsForAttr } from "../lib/formErrors";
import { receiveProject, requestProject } from "../actions/project";
import { withTranslation } from "react-i18next";
import { succesfullSnackBar, errorSnackBar } from "../lib/snackBars";
import { enqueueSnackbar } from "../actions/snackBar";
import TopBar from "../components/Shared/TopBar";
import Masthead from "../components/Homepage/Masthead";
import formStyles from "../utils/formStyles";
import MenuItemsContainer from "./MenuItemsContainer";
import InfoBox from "../components/Shared/InfoBox";

class HomepageContainer extends Component {
  componentDidMount() {}

  render() {
    const { classes, t, project } = this.props;

    return (
      <Fragment>
        <TopBar>
          <Typography variant="h6" color="inherit">
            {t("drawerItems.homepage")}
          </Typography>
        </TopBar>
        <PageContent>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12} lg={8}></Grid>
          </Grid>
        </PageContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  project: (state.project || {}).project,
});

export default withTranslation("translations")(
  withStyles(formStyles)(connect(mapStateToProps)(HomepageContainer)),
);
