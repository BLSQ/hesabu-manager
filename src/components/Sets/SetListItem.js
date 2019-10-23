import { Link, withRouter } from "react-router-dom";
import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import {
  Chip,
  Typography,
  withStyles,
} from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
  sectionTitle: {
    marginBottom: theme.spacing(2)
  },
  groupChip: {
    marginRight: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(2)
  }
});

class SetListItem extends Component {
  render() {
    const { classes,
            t,
            match,
            title,
            description,
            groups } = this.props;

    return (
      <Fragment>
        <Typography variant="h6"
                    className={classNames(classes.sectionTitle)} >
          {title}
        </Typography>
        {(groups || []).map((group, index) => (
          <Chip label={group} className={classNames(classes.groupChip)}/>
        ))}
        <Typography variant="subtitle1" className={classNames(classes.description)}>
          {description}
        </Typography>
      </Fragment>
    );
  }
}

export default withTranslation("translations")(
  withRouter(withStyles(styles)(SetListItem)),
);
