import { Link, withRouter } from "react-router-dom";
import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import {
  Chip,
  Typography,
  withStyles,
} from "@material-ui/core";
import classNames from "classnames";
import LinkIcon from '@material-ui/icons/Link';
import ReactTimeAgo from 'react-time-ago';
import humanizeDuration from 'humanize-duration';

const styles = theme => ({
  simulationTitle: {
    marginBottom: theme.spacing(1/2)
  },
  caption: {
    marginBottom: theme.spacing(2),
  },
  groupChip: {},
  periodChip: {},
  chips: {
    marginRight: theme.spacing(2),
  },
  createdAt: {},
  buildDuration: {},
  interPunct: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
});

const humanDuration = (seconds) => {
  return humanizeDuration(seconds * 1000);
};

class SimulationListItem extends Component {
  render() {
    // AB: Can I make this into a Type?
    const { classes,
            t,
            title,
            createdAt,
            buildDuration,
            groups,
            period,
            state
          } = this.props;

    return (
      <Fragment>
        <Typography variant="h6"
                    className={classNames(classes.simulationTitle)} >
          {title}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom className={classNames(classes.caption)}>
          <span className={classNames(classes.createdAt)}>
            <ReactTimeAgo date={createdAt} />
          </span>
          <span className={classNames(classes.interPunct)}>
            &#183;
          </span>
          <span className={classNames(classes.buildDuration)}>
            {humanDuration(buildDuration)}
          </span>
        </Typography>
        <Chip label={groups.join(", ")} color="secondary" size="small" icon={<LinkIcon />} className={classNames(classes.groupChip, classes.chips)}/>
        <Chip label={period} className={classNames(classes.periodChip, classes.chips)}/>
      </Fragment>
    );
  }
}

export default withTranslation("translations")(
  withRouter(withStyles(styles)(SimulationListItem)),
);
